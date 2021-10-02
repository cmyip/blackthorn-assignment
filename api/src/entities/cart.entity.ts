import {CoreEntity} from "./core.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {CartItemEntity} from "./cart-item.entity";
import {CartStatusConstants} from "../../../domain/constants/cart-status.constants";


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

    @Column({
        type: "enum",
        enum: CartStatusConstants,
        default: CartStatusConstants.NEW
    })
    cartStatus: CartStatusConstants;

    @OneToMany(() => CartItemEntity, cartItem => cartItem.cart, {
        eager: true
    })
    items: CartItemEntity[];
}
