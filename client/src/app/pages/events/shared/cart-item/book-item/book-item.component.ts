import {Component, Input, OnInit} from '@angular/core';
import {CartItemDto} from "@approot/shared/services/dtos/cart-item.dto";
import {CartItemComponent} from "@approot/pages/events/shared/cart-item/cart-item.component";

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent extends CartItemComponent implements OnInit {
  quantityValue = 0;

  ngOnInit(): void {
  }

}
