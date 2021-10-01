import {anything, mock, when} from "ts-mockito";

import {ICartRepository} from "../src/repositories/i.cart.repository";
import {IProductRepository} from "../src/repositories";
import {CartManagerService} from "../src/services/cart-manager.service";
import {ProductEntity} from "../src/entities/product.entity";
import {CartItemEntity} from "../src/entities/cart-item.entity";
import {ProductOrderDto} from "../src/dto/productOrder.dto";
import {CartEntity} from "../src/entities/cart.entity";

let cartManagerService: CartManagerService = null;
let cartRepository: ICartRepository = null;
let productRepository: IProductRepository = null;

function mockProducts(): Promise<ProductEntity[]> {
    return Promise.resolve([
        Object.assign(new ProductEntity(), {
            price: 10,
            id: 1
        })
    ]);
}

function mockFakeCart(): CartEntity {
    /*return Promise.resolve(Object.assign(new CartEntity(), {
        id: 1,
        items: [],
        totalCost: 0,
        subTotal: 0,
        tax: 0,
    }));*/
    return Object.assign(new CartEntity(), {
        id: 1,
        items: [],
        totalCost: 0,
        subTotal: 0,
        tax: 0,
    });
}
beforeEach(() => {
    cartRepository = mock<ICartRepository>();
    productRepository = mock<IProductRepository>();

    const fakeCart = mockFakeCart();
    when(cartRepository.getCartByCode(anything())).thenResolve(fakeCart);
    when(productRepository.getActiveProducts).thenReturn(mockProducts);
    cartManagerService = new CartManagerService(cartRepository, productRepository);
});

describe("CartManager", () => {
    it("should generate cart code", async () => {
        const cart1 = await cartManagerService.createCart();
        const cart2 = await cartManagerService.createCart();
        return cart1.cartCode != cart2.cartCode;
    });

    it("should calculate totals correctly", async () => {
        const cart = await cartManagerService.getCartByCode("1");
        await cartManagerService.updateCart(cart.id, [
            Object.assign(new ProductOrderDto(), {
                productId: 1,
                quantity: 10
            })
        ]);
        return cart.subTotal == 10 * 10;
    });
});
