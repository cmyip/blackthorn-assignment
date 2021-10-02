import {CoreEntity} from "./core.entity";
import {Column, Entity, ManyToOne, OneToOne } from "typeorm";
import {ProductEntity} from "./product.entity";
import {CartEntity} from "./cart.entity";

export enum AttendeeType {
    FREE_TICKET = "free_ticket",
    VIP_TICKET = "vip_ticket"
}

@Entity("attendees", {orderBy: {id: "ASC"}})
export class AttendeeEntity extends CoreEntity {
    @Column({
        type: "enum",
        enum: AttendeeType,
        default: AttendeeType.FREE_TICKET
    })
    attendeeType: AttendeeType;

    @ManyToOne(() => CartEntity, cart => cart.items)
    cart: CartEntity;

    @Column()
    cartId: number;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    receiveCommunications?: boolean;

    @Column({ nullable: true })
    jobTitle?: string;

    @Column({ nullable: true })
    country?: string;

    @Column({ nullable: true })
    company?: string;
}
