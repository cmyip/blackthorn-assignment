import {CartService} from '@approot/shared/services/cart.service';
import {ProductItem} from '@approot/shared/services/dtos/product.item';
import {CartItemTypeEnum} from '@approot/shared/services/enums/cart-item-type.enum';
import {CartSummaryDto} from '@approot/shared/services/dtos/cart-summary.dto';
import {BehaviorSubject} from "rxjs";
import {LocalStorageConstants} from "@approot/shared/constants/local-storage.constants";
import {ProductsServiceProxy} from "@approot/shared/services/service-proxies/products.service-proxy";
import {Injectable} from "@angular/core";

@Injectable()
export class CartApiService implements CartService {
  cartSummary$ = new BehaviorSubject<CartSummaryDto>(null);
  productList$ = new BehaviorSubject<ProductItem[]>([]);
  productsListLoading$ = new BehaviorSubject(false);
  cartSummaryIsLoading$ = new BehaviorSubject(false);

  constructor(private productsProxy: ProductsServiceProxy) {
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

  updateCartQuantity(itemId: number, quantity: number, amount?: number): Promise<CartSummaryDto> {
    this.cartSummaryIsLoading$.next(true);
    return new Promise((accept, reject) => {
      const currentCart = this.cartSummary$.value;

      const cartItemIndex = currentCart.cartItems.findIndex(c => c.itemId === itemId);
      const salesItem = this.productList$.value.find(c => c.id == itemId);
      if (!salesItem) {
        console.error(`Item ID(${itemId} cannot be found in catalog`);
        reject(currentCart);
      }
      if (cartItemIndex > -1) {
        const cartItem = currentCart.cartItems[cartItemIndex];
        if (salesItem.itemType == CartItemTypeEnum.Donation) {
          cartItem.amount = amount;
        } else {
          cartItem.quantity = quantity;
          cartItem.amount = salesItem.price * quantity;
        }
      } else {
        let newAmount;
        if (salesItem.itemType == CartItemTypeEnum.Donation) {
          quantity = 1;
          newAmount = amount;
        } else {
          newAmount = quantity * salesItem.price;
        }
        const cartItem = {
          itemId: salesItem.id,
          itemTitle: salesItem.title,
          amount: newAmount,
          quantity,
          isWaitlist: false
        };
        currentCart.cartItems.push(cartItem);
      }
      const totalAmount = currentCart.cartItems.reduce((collector, cartItem, index) => {
        return collector + cartItem.amount;
      }, 0);
      currentCart.subtotalAmount = totalAmount;
      currentCart.taxAmount = totalAmount * 0.10;
      currentCart.totalAmount = currentCart.subtotalAmount + currentCart.taxAmount;
      console.log(currentCart);
      localStorage.setItem(LocalStorageConstants.CART_SUMMARY, JSON.stringify(currentCart));
      localStorage.setItem(LocalStorageConstants.CART_CODE, currentCart.cartCode);

      setTimeout(() => {
        this.cartSummaryIsLoading$.next(false);
        this.cartSummary$.next(currentCart);
        accept(currentCart);
      });
    });
  }

  getCartByCode(cartCode: string): Promise<CartSummaryDto> {
    return new Promise((accept, reject) => {
      const storageDataString = localStorage.getItem(LocalStorageConstants.CART_SUMMARY);
      const storageDataObj = JSON.parse(storageDataString);
      this.cartSummary$.next(storageDataObj);
    });
  }

  createCart(): Promise<[boolean, string]> {
    const newCartObj = {
      cartCode: 'newcart1',
      promoCode: null,
      subtotalAmount: 0,
      taxAmount: 0,
      totalAmount: 0,
      cartItems: []
    };
    this.cartSummary$.next(newCartObj);
    return Promise.resolve([true, null]);
  }

  loadCart(): Promise<[boolean, string]> {
    const existingCartCode = localStorage.getItem(LocalStorageConstants.CART_CODE);
    if (!existingCartCode) {
      this.createCart();
    } else {
      this.getCartByCode(existingCartCode);
    }
    return Promise.resolve([true, null]);
  }

  getCartQuantityById(id: number): number {
    const currentItem = this.cartSummary$.value.cartItems.find(i => i.itemId == id);
    return currentItem && currentItem.quantity;
  }

  getCartAmountById(id: number): number {
    const currentItem = this.cartSummary$.value.cartItems.find(i => i.itemId == id);
    return currentItem && currentItem.amount;
  }
}
