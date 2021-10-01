import {CoreEntity} from "./core.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {CartItemEntity} from "./cart-item.entity";

@Entity("carts", {orderBy: {id: "ASC"}})
export class CartEntity extends CoreEntity {
    @Column({ unique: true })
    cartCode: string;

    @Column({ default: 0, type: "decimal"})
    totalCost: number;

    @Column({ nullable: true, type: "decimal"})
    promoCode: string;

    @Column({ default: 0, type: "decimal"})
    subTotal: number;

    @Column({ default: 0, type: "decimal"})
    tax: number;

    @OneToMany(() => CartItemEntity, cartItem => cartItem.cart, {
        eager: true
    })
    items: CartItemEntity[];
}
