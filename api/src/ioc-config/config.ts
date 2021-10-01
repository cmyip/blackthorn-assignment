import { Container } from "inversify";
// import { CustomRepository } from './base/typeorm';
import { REPOSITORY_TYPES } from "./types";
import {ProductRepository} from "../repositories/product.repository";
import {IProductRepository} from "../repositories/i.product.repository";

// init container
const container = new Container();

// register repositories
// container.bind<IUserRepository>(REPOSITORY_TYPES.IUserRepository).to(UserRepository).inSingletonScope();
container.bind<IProductRepository>(REPOSITORY_TYPES.IProductRepository).to(ProductRepository).inSingletonScope();


export default container;
