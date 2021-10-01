import {ICartManagerService} from "./i.cart-manager.service";
import {ProductOrderDto} from "../dto/productOrder.dto";
import {CartEntity} from "../entities/cart.entity";
import {inject, injectable} from "inversify";
import {REPOSITORY_TYPES} from "../ioc-config/types";
import {EntityNotFoundError, Repository} from "typeorm";
import {CartItemEntity} from "../entities/cart-item.entity";
import {ICartRepository} from "../repositories/i.cart.repository";
import {IProductRepository} from "../repositories";
import {ProductTypeConstants} from "../../../domain/constants/catalog-item-type.constants";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class CartManagerService implements ICartManagerService{
    constructor(
        @inject(REPOSITORY_TYPES.ICartRepository) private cartRepository: ICartRepository,
        @inject(REPOSITORY_TYPES.CartItemEntity) private cartItemRepository: Repository<CartItemEntity>,
        @inject(REPOSITORY_TYPES.IProductRepository) private productRepository: IProductRepository,
    ) {
    }

    async createCart(): Promise<CartEntity> {
        // generate cart code, browser to keep track of cart using cart code
        const cartCode = uuidv4().toString();
        const newCart = new CartEntity();
        newCart.cartCode = cartCode;
        await this.cartRepository.create(newCart);
        return newCart;
    }

    getCartByCode(cartCode: string): Promise<CartEntity> {
        return new Promise(async (resolve, reject) => {
            const cart = await this.cartRepository.getCartByCode(cartCode);
            this.calculateCartItems(cart);
            resolve(cart);
        });
    }

    async updateCart(cartId: number, cartItems: ProductOrderDto[]): Promise<CartEntity> {
        const cart = await this.cartRepository.getById(cartId);
        if (!cart) {
            throw new EntityNotFoundError(CartEntity, `Cart with ID ${cartId} does not exist`);
        }

        const items = await Promise.all(cartItems.map(async (item) => {
            const product = await this.productRepository.getById(item.productId);
            return Object.assign(new CartItemEntity(), {
                product,
                cart,
                quantity: item.quantity,
                donationAmount: item.donationAmount
            });
        }));

        return this.updateCartByItems(cart, items);
    }

    async updateCartByItems(cart: CartEntity, items: CartItemEntity[]): Promise<CartEntity> {
        for (const existingItem of cart.items) {
            await this.cartItemRepository.delete(existingItem);
        }
        for (const newItem of items) {
            await newItem.save();
        }
        cart.items = [...items];
        this.calculateCartItems(cart);
        await cart.save();
        // await this.cartRepository.update(cart.id, cart);
        return cart;
    }

    private calculateCartItems(cart: CartEntity) {
        let cartTotal = 0;
        for (const item of cart.items) {
            if (item.product && item.product.itemType == ProductTypeConstants.Donation) {
                cartTotal += item.donationAmount;
                continue;
            }
            const subtotal = item.quantity * item.product.price;
            item.donationAmount = subtotal;
            cartTotal += subtotal;
        }
        cart.tax = cartTotal * this.getTaxRate();
        cart.subTotal = cartTotal;
        cart.totalCost = cart.tax + cart.subTotal;
        return cart;
    }
    

    getTaxRate() {
        return 0.10;
    }

}
