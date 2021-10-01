import {CartService} from '@approot/shared/services/cart.service';
import {CartItemDto} from '@approot/shared/services/dtos/cart-item.dto';
import {CartItemTypeEnum} from '@approot/shared/services/enums/cart-item-type.enum';
import {CartSummaryDto} from '@approot/shared/services/dtos/cart-summary.dto';
import {BehaviorSubject} from "rxjs";
import {LocalStorageConstants} from "@approot/shared/constants/local-storage.constants";

export class CartMockService implements CartService {
  catalogItems = [
    {
      id: 1,
      title: 'Free Ticket',
      description: 'Free ticket for anyone to make a valuable contribution towards our future online events programme. Thank You',
      itemType: CartItemTypeEnum.FreeTicket,
      numberAvailable: 3,
      price: 0,
      salesEndDate: CartMockService.futureHours(1)
    },
    {
      id: 2,
      title: 'Alumni VIP Ticket',
      description: 'This livestream will broadcast via a private YouTube link that will be sent to ticket purchasers an hour prior to showtime',
      itemType: CartItemTypeEnum.AlumniTicket,
      numberAvailable: 4,
      price: 3500,
      salesEndDate: CartMockService.futureDays(5)
    },
    {
      id: 3,
      title: 'Donate',
      description: 'Access to arts is vital. Pay what you can.',
      itemType: CartItemTypeEnum.Donation,
    },
    {
      id: 4,
      title: 'Book: Good Strategy - Bad Strategy',
      description: 'Learn from the experts of business process management',
      itemType: CartItemTypeEnum.Book,
      price: 17.99,
      imgUrl: '/assets/images/book-sample.png'
    }
  ];
  cartSummary$ = new BehaviorSubject<CartSummaryDto>(null);
  catalogItems$ = new BehaviorSubject<CartItemDto[]>([]);
  cartIsLoading$ = new BehaviorSubject(false);
  cartSummaryIsLoading$ = new BehaviorSubject(false);

  static futureDays(days): Date {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
  }
  static futureHours(hours): Date {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + hours);
    return currentDate;
  }
  refreshItems(): Promise<[boolean, string?]> {
    return new Promise((accept, reject) => {
      setTimeout(() => {
        accept([true, null]);
        this.catalogItems$.next(this.catalogItems);
      }, 2000);
    });
  }

  updateCartQuantity(itemId: number, quantity: number, amount?: number): Promise<CartSummaryDto> {
    this.cartSummaryIsLoading$.next(true);
    return new Promise((accept, reject) => {
      const currentCart = this.cartSummary$.value;

      const cartItemIndex = currentCart.cartItems.findIndex(c => c.itemId === itemId);
      const salesItem = this.catalogItems$.value.find(c => c.id == itemId);
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
