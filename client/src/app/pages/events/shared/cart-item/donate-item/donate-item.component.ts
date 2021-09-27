import { Component, OnInit } from '@angular/core';
import {CartItemComponent} from '@approot/pages/events/shared/cart-item/cart-item.component';
import {convertToCurrency} from "@approot/core/utils/helper";

@Component({
  selector: 'app-donate-item',
  templateUrl: './donate-item.component.html',
  styleUrls: ['./donate-item.component.scss']
})
export class DonateItemComponent extends CartItemComponent implements OnInit {
  amountOptions = [
    {
      id: 1,
      amount: 50
    },
    {
      id: 2,
      amount: 100
    },
    {
      id: 3,
      amount: 200
    },
    {
      id: 4,
      amount: 500
    }
  ];
  donationAmount: number;
  onAmountClick(amountItem): void {
    this.donationAmount = amountItem.amount;
    this.onAmountChange();
  }

  ngOnInit(): void {
  }

  onAmountChange(): void {
    setTimeout(() => {
      this.cartService.updateCartQuantity(this.cartItem.id, 1, this.donationAmount);
    }, 100);
  }

}
