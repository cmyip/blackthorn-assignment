import {ProductOrderDto} from "../dto/productOrder.dto";
import {CartEntity} from "../entities/cart.entity";
import {CartItemEntity} from "../entities/cart-item.entity";
import {AttendeeEntity} from "../entities/attendees.entity";
import {AttendeeUpdateDto} from "../dto/attendee-update.dto";
import {CartStatusConstants} from "../constants/cart-status.constants";

export interface ICartManagerService {
    getCartByCode(cartCode: string): Promise<CartEntity>
    updateCart(cartId: number, cartItems: ProductOrderDto[]): Promise<CartEntity>
    updateCartByItems(cart: CartEntity, items: CartItemEntity[]): Promise<CartEntity>
    createCart(): Promise<CartEntity>
    updateCartStatus(cart: CartEntity, cartStatus: CartStatusConstants): Promise<CartEntity>

    generateAttendees(cart: CartEntity): Promise<AttendeeEntity[]>
    validateAttendees(cart: CartEntity, attendeeUpdates: AttendeeUpdateDto[]): Promise<boolean>
    updateAttendees(cart: CartEntity, attendeeUpdates: AttendeeUpdateDto[]): Promise<AttendeeEntity[]>
}
