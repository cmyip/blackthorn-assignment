import {Component, ComponentFactory, ComponentFactoryResolver, Input, OnInit} from '@angular/core';
import {CartService} from "@approot/shared/services/cart.service";
import * as dayjs from "dayjs";
import {CartItemDto} from "@approot/shared/services/dtos/cart-item.dto";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItemDto;
  constructor(protected cartService: CartService) { }
  public cartEndTimeText = '';
  quantityValue = 0;

  ngOnInit(): void {
    this.processCartItemText();
    this.getCartQuantity();
  }

  processCartItemText(): void {
    this.cartEndTimeText = dayjs(this.cartItem.salesEndDate).from(new Date(), true);
  }

  shouldTimeBeRed(): boolean {
    const diffDays = dayjs(this.cartItem.salesEndDate).diff(new Date(), 'day');
    return diffDays < 1;
  }

  getCartQuantity(): void {
    this.quantityValue = this.cartService.getCartQuantityById(this.cartItem.id);
  }

  public onQuantityChange($event): void {
    setTimeout(() => {
      console.log(this.cartItem);
      this.cartService.updateCartQuantity(this.cartItem.id, this.quantityValue);
    }, 100);
  }
}
