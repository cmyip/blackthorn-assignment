import {Component, ComponentFactory, ComponentFactoryResolver, Input, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "@approot/shared/services/cart.service";
import * as dayjs from "dayjs";
import {ProductItem} from "@approot/shared/services/dtos/product.item";
import {interval, Subject, Subscription} from "rxjs";
import {debounce} from "rxjs/operators";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input() cartItem: ProductItem;
  constructor(protected cartService: CartService) { }
  public cartEndTimeText = '';
  quantityValue = 0;
  quantityChange$ = new Subject();
  cartSubscription: Subscription;

  ngOnInit(): void {
    this.processCartItemText();
    this.getCartQuantity();
    this.listenToQuantityChange();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  listenToQuantityChange(): void {
    this.quantityChange$
      .pipe(
        debounce(() => interval(500))
      ).subscribe((changed) => {
      this.cartService.updateCartQuantity(this.cartItem.id, this.quantityValue);
    })
  }

  processCartItemText(): void {
    this.cartEndTimeText = dayjs(this.cartItem.salesEndDate).from(new Date(), true);
  }

  shouldTimeBeRed(): boolean {
    const diffDays = dayjs(this.cartItem.salesEndDate).diff(new Date(), 'day');
    return diffDays < 1;
  }

  getCartQuantity(): void {
    this.cartSubscription = this.cartService.cartSummary$.subscribe((cart) => {
      this.quantityValue = this.cartService.getCartQuantityById(this.cartItem.id);
    });
  }

  public onQuantityChange($event): void {
    this.quantityChange$.next($event);
  }
}
