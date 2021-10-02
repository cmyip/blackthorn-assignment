import {AttendeeEntity} from "../entities/attendees.entity";
import {CartEntity} from "../entities/cart.entity";
import {IAttendeeRepository} from "./i.attendee.repository";
import {BaseRepository} from "./base/base.repository";
import {Repository} from "typeorm";
import {inject} from "inversify";
import {REPOSITORY_TYPES} from "../ioc-config/types";

export class AttendeeRepository extends BaseRepository<AttendeeEntity> implements IAttendeeRepository {
    constructor(
        @inject(REPOSITORY_TYPES.AttendeeEntity) private attendeeRepository: Repository<AttendeeEntity>
    ) {
        super(attendeeRepository);
    }

    getAttendeesByCart(cart: CartEntity): Promise<AttendeeEntity[]> {
        return this.attendeeRepository.find({cartId: Number(cart.id)});
    }
}
