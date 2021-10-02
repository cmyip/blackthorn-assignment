import {IBaseRepository} from "./base/i.base.repository";
import {CartEntity} from "../entities/cart.entity";
import {AttendeeEntity} from "../entities/attendees.entity";

export interface IAttendeeRepository extends IBaseRepository<AttendeeEntity> {
    getAttendeesByCart(cart:CartEntity): Promise<AttendeeEntity[]>;
}

