import {CartItemDto} from '@approot/shared/services/dtos/cart-item.dto';
import {CartQuantityDto} from '@approot/shared/services/dtos/cart-quantity.dto';
import {CartSummaryDto} from '@approot/shared/services/dtos/cart-summary.dto';
import {BehaviorSubject} from 'rxjs';

export abstract class CartService {
  cartSummary$ = new BehaviorSubject<CartSummaryDto>(null);
  cartIsLoading$ = new BehaviorSubject(false);
  catalogItems$ = new BehaviorSubject<CartItemDto[]>([]);
  abstract refreshItems(): Promise<[boolean, string?]>;

  abstract getCartByCode(cartCode: string): Promise<CartSummaryDto>;
  abstract updateCartQuantity(itemId: number, quantity: number, amount?: number): Promise<CartSummaryDto>;
  abstract loadCart(): Promise<[boolean, string?]>;
  abstract createCart(): Promise<[boolean, string?]>;
  abstract getCartQuantityById(id: number): number;
  abstract getCartAmountById(id: number): number;
}
