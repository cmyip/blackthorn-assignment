import { interfaces } from "inversify";
import { Repository } from "typeorm";
import { getRepositories } from "./db/repository.factory";
import { REPOSITORY_TYPES } from "./types";
import {ProductEntity} from "../entities/product.entity";
import {CartEntity} from "../entities/cart.entity";
import {CartItemEntity} from "../entities/cart-item.entity";
import {AttendantsEntity} from "../entities/attendants.entity";

export default async function bindRepositories(
    container: interfaces.Container
) {
   const entityTypes = [
        REPOSITORY_TYPES.ProductEntity,
       REPOSITORY_TYPES.CartEntity,
       REPOSITORY_TYPES.CartItemEntity,
       REPOSITORY_TYPES.AttendantEntity
   ];
   const repositories = await getRepositories<any>([ProductEntity, CartEntity, CartItemEntity, AttendantsEntity]);
   repositories.forEach((repository, i) => {
    const repositoryType = entityTypes[i];
    container.bind<Repository<any>>(repositoryType).toConstantValue(repository);
   });
   return repositories;
}
