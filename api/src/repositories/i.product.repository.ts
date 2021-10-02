import { IBaseRepository } from "./base/i.base.repository";
import {ProductEntity} from "../entities/product.entity";

export interface IProductRepository extends IBaseRepository<ProductEntity> {
    getActiveProducts(saleEndDate: Date): Promise<ProductEntity[]>;
    getByEvent(eventId: number): Promise<ProductEntity[]>;
}
