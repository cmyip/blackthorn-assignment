import {ProductItem} from '@approot/shared/services/dtos/product.item';
import {CartQuantityDto} from '@approot/shared/services/dtos/cart-quantity.dto';
import {CartDto} from '@approot/shared/services/dtos/cart.dto';
import {BehaviorSubject} from 'rxjs';

export abstract class CartService {
  cartSummary$ = new BehaviorSubject<CartDto>(null);
  productsListLoading$ = new BehaviorSubject(false);
  productList$ = new BehaviorSubject<ProductItem[]>([]);
  abstract refreshProducts(): Promise<[boolean, string?]>;

  abstract getCartByCode(cartCode: string): Promise<CartDto>;
  abstract updateCartQuantity(itemId: number, quantity: number, amount?: number): Promise<CartDto>;
  abstract loadCart(): Promise<[boolean, string?]>;
  abstract createCart(): Promise<[boolean, string?]>;
  abstract getCartQuantityById(id: number): number;
  abstract getCartAmountById(id: number): number;
}
