import {ProductItem} from '@approot/shared/services/dtos/product.item';
import {CartQuantityDto} from '@approot/shared/services/dtos/cart-quantity.dto';
import {CartSummaryDto} from '@approot/shared/services/dtos/cart-summary.dto';
import {BehaviorSubject} from 'rxjs';

export abstract class CartService {
  cartSummary$ = new BehaviorSubject<CartSummaryDto>(null);
  productsListLoading$ = new BehaviorSubject(false);
  productList$ = new BehaviorSubject<ProductItem[]>([]);
  abstract refreshProducts(): Promise<[boolean, string?]>;

  abstract getCartByCode(cartCode: string): Promise<CartSummaryDto>;
  abstract updateCartQuantity(itemId: number, quantity: number, amount?: number): Promise<CartSummaryDto>;
  abstract loadCart(): Promise<[boolean, string?]>;
  abstract createCart(): Promise<[boolean, string?]>;
  abstract getCartQuantityById(id: number): number;
  abstract getCartAmountById(id: number): number;
}
