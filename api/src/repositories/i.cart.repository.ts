import { IBaseRepository } from "./base/i.base.repository";
import {ProductEntity} from "../entities/product.entity";
import {CartEntity} from "../entities/cart.entity";

export interface ICartRepository extends IBaseRepository<CartEntity> {
    getCartByCode(cartCode:string): Promise<CartEntity>;
}
