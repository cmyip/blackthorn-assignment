import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CartDto} from "@approot/shared/services/dtos/cart.dto";

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit, OnChanges {
  @Input() cartSummary: CartDto;
  @Output() onApplyPromoCode = new EventEmitter();
  showCodeBox = false;
  promoCode = null;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onApplyClick(): void {

  }
}
