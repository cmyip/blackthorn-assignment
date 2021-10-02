import { Container } from "inversify";
import { REPOSITORY_TYPES } from "./types";
import {ProductRepository} from "../repositories/product.repository";
import {IProductRepository} from "../repositories/i.product.repository";
import {ICartRepository} from "../repositories/i.cart.repository";
import {CartRepository} from "../repositories/cart.repository";
import {ICartManagerService} from "../services/i.cart-manager.service";
import {CartManagerService} from "../services/cart-manager.service";
import {IAttendeeRepository} from "../repositories/i.attendee.repository";
import {AttendeeRepository} from "../repositories/attendee.repository";

// init container
const container = new Container();

// register repositories
container.bind<IProductRepository>(REPOSITORY_TYPES.IProductRepository).to(ProductRepository).inRequestScope();
container.bind<ICartRepository>(REPOSITORY_TYPES.ICartRepository).to(CartRepository).inRequestScope();
container.bind<IAttendeeRepository>(REPOSITORY_TYPES.IAttendeeRepository).to(AttendeeRepository).inRequestScope();
container.bind<ICartManagerService>(REPOSITORY_TYPES.ICartManagerService).to(CartManagerService).inRequestScope();


export default container;
