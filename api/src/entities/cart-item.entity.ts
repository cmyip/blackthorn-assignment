import {CoreEntity} from "./core.entity";
import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {ProductEntity} from "./product.entity";
import {CartEntity} from "./cart.entity";

@Entity("cart_items", {orderBy: {id: "ASC"}})
export class CartItemEntity extends CoreEntity {
    @ManyToOne(() => ProductEntity, {
        eager: true
    })
    product: ProductEntity;

    @ManyToOne(() => CartEntity, cart => cart.items)
    cart: CartEntity;

    @Column({ default: false})
    isWaitList?: boolean;

    @Column({ nullable: true})
    quantity?: number;

    @Column({nullable: true, type: "decimal"})
    donationAmount?: number;
}
