import {CoreEntity} from "./core.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity("products", {orderBy: {id: "ASC"}})
export class ProductEntity extends CoreEntity {
    @Column()
    title: string;

    @Column()
    is_active: boolean;

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
}
