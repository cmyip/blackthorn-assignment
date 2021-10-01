import { interfaces } from "inversify";
import { Repository } from "typeorm";
import { getRepositories } from "./db/repository.factory";
import { REPOSITORY_TYPES } from "./types";
import {ProductEntity} from "../entities/product.entity";

export default async function bindRepositories(
    container: interfaces.Container
) {
   const entityTypes = [
        REPOSITORY_TYPES.ProductEntity
   ];
   const repositories = await getRepositories<any>([ProductEntity]);
   repositories.forEach((repository, i) => {
    const repositoryType = entityTypes[i];
    container.bind<Repository<any>>(repositoryType).toConstantValue(repository);
   });
   return repositories;
}
