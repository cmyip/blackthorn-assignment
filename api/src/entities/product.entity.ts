import {CoreEntity} from "./core.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {EventEntity} from "./event.entity";

@Entity("products", {orderBy: {id: "ASC"}})
export class ProductEntity extends CoreEntity {
    @Column()
    title: string;

    @Column()
    isActive: boolean;

    @Column()
    description: string;

    @Column()
    itemType: number;

    @Column({nullable: true})
    numberAvailable: number;

    @Column({ type: "decimal", nullable: true})
    price: number;

    @Column({ nullable: true })
    imgUrl?: string;

    @Column({nullable: true})
    salesEndDate: Date;

    @ManyToOne(() => EventEntity, event => event.products)
    event: EventEntity;
}
