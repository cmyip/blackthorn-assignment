import {CartService} from '@approot/shared/services/cart.service';
import {ProductItem} from '@approot/shared/services/dtos/product.item';
import {CartItemTypeEnum} from '@approot/shared/services/enums/cart-item-type.enum';
import {CartDto} from '@approot/shared/services/dtos/cart.dto';
import {BehaviorSubject, interval} from "rxjs";
import {LocalStorageConstants} from "@approot/shared/constants/local-storage.constants";
import {ProductsServiceProxy} from "@approot/shared/services/service-proxies/products.service-proxy";
import {Injectable} from "@angular/core";
import {CartServiceProxy} from "@approot/shared/services/service-proxies/cart.service-proxy";
import {debounce} from "rxjs/operators";
import {CartQuantityDto} from "@approot/shared/services/dtos/cart-quantity.dto";

@Injectable()
export class CartApiService implements CartService {
  cartSummary$ = new BehaviorSubject<CartDto>(null);
  productList$ = new BehaviorSubject<ProductItem[]>([]);
  productsListLoading$ = new BehaviorSubject(false);
  cartSummaryIsLoading$ = new BehaviorSubject(false);

  cartUpdateEvents$ = new BehaviorSubject<CartQuantityDto[]>(null);

  constructor(private productsProxy: ProductsServiceProxy, private cartProxy: CartServiceProxy) {
    // this.listenForCartUpdates();
  }

  private listenForCartUpdates(): void {
    this.cartUpdateEvents$
      .pipe(debounce(() => interval(1000)))
      .subscribe(async (cartUpdate) => {
        console.log("Requesting for cart updates");
        const cartSummary = await this.cartProxy.updateCart(this.cartSummary$.value.cartCode, cartUpdate);
        console.log("Cart update returned");
        this.cartSummary$.next(cartSummary);
    });
  }

  async refreshProducts(): Promise<[boolean, string?]> {
    this.productsListLoading$.next(true);
    try {
      const products = await this.productsProxy.getProducts();
      this.productList$.next(products);
    } catch (exception) {
      console.error(exception);
      return [false, exception.getMessage()];
    }
    this.productsListLoading$.next(false);
    return [true, ''];
  }

  updateCartQuantity(productId: number, quantity: number, amount?: number): Promise<CartDto> {
    this.cartSummaryIsLoading$.next(true);
    return new Promise(async (accept, reject) => {
      const currentCart = this.cartSummary$.value;

      const cartItemIndex = currentCart.cartItems.findIndex(c => c.productId === productId);
      const salesItem = this.productList$.value.find(c => c.id == productId);
      if (!salesItem) {
        console.error(`Item ID(${productId} cannot be found in catalog`);
        reject(currentCart);
      }
      const cartItems = currentCart.cartItems.map((cartItem) => ({
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        donationAmount: cartItem.amount
      }));
      if (cartItemIndex === -1) {
        cartItems.push({
          productId,
          quantity,
          donationAmount: amount
        });
      } else {
        cartItems[cartItemIndex].quantity = quantity;
        cartItems[cartItemIndex].donationAmount = amount;
      }
      const newCartState = await this.cartProxy.updateCart(currentCart.cartCode, cartItems);
      this.cartSummary$.next(newCartState);
      this.cartSummaryIsLoading$.next(false);
    });
  }

  async getCartByCode(cartCode: string): Promise<CartDto> {
    console.log(`Loading cart with code ${cartCode}`);
    const cartData = await this.cartProxy.getCart(cartCode);
    this.cartSummary$.next(cartData);
    return cartData;
  }

  async createCart(): Promise<[boolean, string]> {
    console.log(`Creating cart`);
    const cartData = await this.cartProxy.createCart();
    this.cartSummary$.next(cartData);
    this.storeCartCode(cartData);
    return Promise.resolve([true, null]);
  }

  async loadCart(): Promise<[boolean, string]> {
    const existingCartCode = localStorage.getItem(LocalStorageConstants.CART_CODE);
    if (!existingCartCode) {
      const cart = await this.createCart();
    } else {
      await this.getCartByCode(existingCartCode);
    }
    return Promise.resolve([true, null]);
  }

  private storeCartCode(cart): void {
    localStorage.setItem(LocalStorageConstants.CART_CODE, cart.cartCode);
  }

  getCartQuantityById(id: number): number {
    if (!this.cartSummary$.value) { return 0; }
    const currentItem = this.cartSummary$.value.cartItems.find(i => i.productId == id);
    return currentItem && currentItem.quantity;
  }

  getCartAmountById(id: number): number {
    if (!this.cartSummary$.value) { return 0; }
    const currentItem = this.cartSummary$.value.cartItems.find(i => i.productId == id);
    return currentItem && currentItem.amount;
  }
}
