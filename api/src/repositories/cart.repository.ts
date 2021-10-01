import {IProductRepository} from "./i.product.repository";
import {ProductEntity} from "../entities/product.entity";
import {BaseRepository} from "./base/base.repository";
import {EntityNotFoundError, MoreThan, Repository} from "typeorm";
import {inject} from "inversify";
import {REPOSITORY_TYPES} from "../ioc-config/types";
import {CartEntity} from "../entities/cart.entity";
import {ICartRepository} from "./i.cart.repository";

export class CartRepository extends BaseRepository<CartEntity> implements ICartRepository {
    private cartRepository: Repository<CartEntity>;
    constructor(
        @inject(REPOSITORY_TYPES.CartEntity) repository: Repository<CartEntity>
    ) {
        super(repository);
        this.cartRepository = repository;
    }

    async getCartByCode(cartCode: string): Promise<CartEntity> {
        return await this.cartRepository
            .findOne({ cartCode });
    }
}
