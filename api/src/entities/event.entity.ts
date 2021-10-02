import {CoreEntity} from "./core.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {CartItemEntity} from "./cart-item.entity";
import {ProductEntity} from "./product.entity";

export enum EventStatus {
    Draft= "draft",
    Open = "open",
    SoldOut = "sold_out",
    Closed = "closed"
}

@Entity("events", {orderBy: {id: "ASC"}})
export class EventEntity extends CoreEntity {
    @Column()
    title: string;

    @Column({ type: "date"})
    startDate: Date;

    @Column({ type: "date"})
    endDate: Date;

    @Column({
        type: "enum",
        enum: EventStatus,
        default: EventStatus.Open
    })
    status: EventStatus;

    @Column()
    description: string;

    @Column()
    bannerImageUrl: string;

    @OneToMany(() => ProductEntity, product => product.event)
    products: ProductEntity[];
}
