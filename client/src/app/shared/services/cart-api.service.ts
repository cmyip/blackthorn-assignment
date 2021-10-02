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
import {AttendeesDto} from "@approot/shared/services/dtos/attendees.dto";
import {AttendeesServiceProxy} from "@approot/shared/services/service-proxies/attendees.service-proxy";

@Injectable()
export class CartApiService implements CartService {
  cartSummary$ = new BehaviorSubject<CartDto>(null);
  productList$ = new BehaviorSubject<ProductItem[]>([]);
  attendeesList$ = new BehaviorSubject<AttendeesDto[]>([]);
  productsListLoading$ = new BehaviorSubject(false);
  cartSummaryIsLoading$ = new BehaviorSubject(false);
  attendeesListIsLoading$ = new BehaviorSubject(false);

  constructor(private productsProxy: ProductsServiceProxy,
              private cartProxy: CartServiceProxy,
              private attendeesProxy: AttendeesServiceProxy) {
  }

  async refreshProducts(eventId): Promise<[boolean, string?]> {
    this.productsListLoading$.next(true);
    try {
      const products = await this.productsProxy.getProducts(eventId);
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
    try {
      const cartData = await this.cartProxy.getCart(cartCode);
      this.cartSummary$.next(cartData);
      return cartData;
    } catch (exception) {
      this.clearCartCode();
      const [result, cartInfo] = await this.createCart();
      return this.cartSummary$.value;
    }
  }

  async createCart(): Promise<[boolean, string]> {
    console.log(`Creating cart`);
    const cartData = await this.cartProxy.createCart();
    this.cartSummary$.next(cartData);
    this.storeCartCode(cartData);
    return Promise.resolve([true, null]);
  }

  async loadCart(): Promise<[boolean, string]> {
    const existingCartCode = this.getCartCode();
    if (!existingCartCode) {
      await this.createCart();
    } else {
      await this.getCartByCode(existingCartCode);
    }
    return Promise.resolve([true, null]);
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

  async refreshAttendees(): Promise<boolean> {
    const cartCode = this.getCartCode();
    this.attendeesListIsLoading$.next(true);
    try {
      const attendees = await this.attendeesProxy.getAttendees(cartCode);
      this.attendeesList$.next(attendees);
      this.attendeesListIsLoading$.next(false);
      return true;
    } catch (exception) {
      return false;
    }
  }

  updateAttendees(attendeeList: AttendeesDto[]): Promise<AttendeesDto[]> {
    const cartCode = this.getCartCode();
    return this.attendeesProxy.updateAttendees(cartCode, attendeeList);
  }

  async checkoutCart(): Promise<CartDto> {
    const cartCode = this.getCartCode();
    const newCartInfo = await this.cartProxy.checkoutCart(cartCode);
    this.cartSummary$.next(newCartInfo);
    return newCartInfo;
  }

  private getCartCode(): string {
    return localStorage.getItem(LocalStorageConstants.CART_CODE);
  }

  private storeCartCode(cart): void {
    localStorage.setItem(LocalStorageConstants.CART_CODE, cart.cartCode);
  }

  private clearCartCode(): void {
    localStorage.removeItem(LocalStorageConstants.CART_CODE);
  }
}
