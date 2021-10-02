import { interfaces } from "inversify";
import { Repository } from "typeorm";
import { getRepositories } from "./db/repository.factory";
import { REPOSITORY_TYPES } from "./types";
import {ProductEntity} from "../entities/product.entity";
import {CartEntity} from "../entities/cart.entity";
import {CartItemEntity} from "../entities/cart-item.entity";
import {AttendeeEntity} from "../entities/attendees.entity";
import {EventEntity} from "../entities/event.entity";

export default async function bindRepositories(
    container: interfaces.Container
) {
   const entityTypes = [
       REPOSITORY_TYPES.ProductEntity,
       REPOSITORY_TYPES.CartEntity,
       REPOSITORY_TYPES.CartItemEntity,
       REPOSITORY_TYPES.AttendeeEntity,
       REPOSITORY_TYPES.EventEntity
   ];
   const repositories = await getRepositories<any>([ProductEntity, CartEntity, CartItemEntity, AttendeeEntity, EventEntity]);
   repositories.forEach((repository, i) => {
    const repositoryType = entityTypes[i];
    container.bind<Repository<any>>(repositoryType).toConstantValue(repository);
   });
   return repositories;
}
