import {ProductItem} from '@approot/shared/services/dtos/product.item';
import {CartQuantityDto} from '@approot/shared/services/dtos/cart-quantity.dto';
import {CartDto} from '@approot/shared/services/dtos/cart.dto';
import {BehaviorSubject, Subject} from 'rxjs';
import {AttendeesDto} from "@approot/shared/services/dtos/attendees.dto";

export abstract class CartService {
  cartSummary$ = new BehaviorSubject<CartDto>(null);
  productsListLoading$ = new BehaviorSubject(false);
  productList$ = new BehaviorSubject<ProductItem[]>([]);
  attendeesList$ = new BehaviorSubject<AttendeesDto[]>([]);
  attendeesListIsLoading$ = new Subject<boolean>();
  abstract refreshProducts(eventId): Promise<[boolean, string?]>;

  abstract getCartByCode(cartCode: string): Promise<CartDto>;
  abstract updateCartQuantity(itemId: number, quantity: number, amount?: number): Promise<CartDto>;
  abstract loadCart(): Promise<[boolean, string?]>;
  abstract createCart(): Promise<[boolean, string?]>;
  abstract getCartQuantityById(id: number): number;
  abstract getCartAmountById(id: number): number;
  abstract refreshAttendees(): Promise<boolean>;
  abstract updateAttendees(attendeeList: AttendeesDto[]): Promise<AttendeesDto[]>;
  abstract checkoutCart(): Promise<CartDto>;
}
