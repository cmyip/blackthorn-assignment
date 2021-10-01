import {CoreEntity} from "./core.entity";
import {Column, Entity, ManyToOne, OneToOne } from "typeorm";
import {ProductEntity} from "./product.entity";
import {CartEntity} from "./cart.entity";

export enum AttendantType {
    FREE_TICKET = "free_ticket",
    VIP_TICKET = "vip_ticket"
}

@Entity("attendants", {orderBy: {id: "ASC"}})
export class AttendantsEntity extends CoreEntity {
    @Column({
        type: "enum",
        enum: AttendantType,
        default: AttendantType.FREE_TICKET
    })
    attendantType: AttendantType;

    @ManyToOne(() => CartEntity, cart => cart.items)
    cart: CartEntity;

    @Column()
    firstName?: string;

    @Column()
    lastName?: string;

    @Column()
    email?: string;

    @Column()
    receiveCommunications?: boolean;

    @Column()
    phone?: string;

    @Column()
    company?: string;
}
