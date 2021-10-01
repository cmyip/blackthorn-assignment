import {Component, Input, OnInit} from '@angular/core';
import {ProductItem} from "@approot/shared/services/dtos/product.item";
import {CartItemComponent} from "@approot/pages/events/shared/cart-item/cart-item.component";

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent extends CartItemComponent implements OnInit {
  ngOnInit(): void {
    super.ngOnInit();
  }

}
