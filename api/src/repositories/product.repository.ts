import {IProductRepository} from "./i.product.repository";
import {ProductEntity} from "../entities/product.entity";
import {BaseRepository} from "./base/base.repository";
import {MoreThan, Repository} from "typeorm";
import {inject} from "inversify";
import {REPOSITORY_TYPES} from "../ioc-config/types";

export class ProductRepository extends BaseRepository<ProductEntity> implements IProductRepository {
    private productRepository: Repository<ProductEntity>;
    constructor(
        @inject(REPOSITORY_TYPES.ProductEntity) repository: Repository<ProductEntity>
    ) {
        super(repository);
        this.productRepository = repository;
    }

    getActiveProducts(saleEndDate: Date): Promise<ProductEntity[]> {
        return this.productRepository.find({
            where: {isActive: true}
        });
    }

    getByEvent(eventId: number): Promise<ProductEntity[]> {
        return this.productRepository.find({
            where: { eventId: eventId }
        });
    }
}
