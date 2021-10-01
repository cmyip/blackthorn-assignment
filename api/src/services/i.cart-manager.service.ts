import {ProductOrderDto} from "../dto/productOrder.dto";
import {CartEntity} from "../entities/cart.entity";
import {CartItemEntity} from "../entities/cart-item.entity";

export interface ICartManagerService {
    getCartByCode(cartCode: string): Promise<CartEntity>
    updateCart(cartId: number, cartItems: ProductOrderDto[]): Promise<CartEntity>
    updateCartByItems(cart: CartEntity, items: CartItemEntity[]): Promise<CartEntity>
    createCart(): Promise<CartEntity>
}
