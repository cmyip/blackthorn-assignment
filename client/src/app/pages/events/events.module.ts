import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { CartSummaryComponent } from './shared/cart-summary/cart-summary.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzCardModule} from 'ng-zorro-antd/card';
import {CartService} from '@approot/shared/services/cart.service';
import {CartMockService} from '@approot/shared/services/cart-mock.service';
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import { BookItemComponent } from './shared/cart-item/book-item/book-item.component';
import {CartItemComponent} from "@approot/pages/events/shared/cart-item/cart-item.component";
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { DonateItemComponent } from './shared/cart-item/donate-item/donate-item.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {FormsModule} from "@angular/forms";
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzButtonModule} from "ng-zorro-antd/button";

@NgModule({
  declarations: [
    CartSummaryComponent,
    CheckoutComponent,
    BookItemComponent,
    CartItemComponent,
    DonateItemComponent
  ],
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzCardModule,
    EventsRoutingModule,
    NzSkeletonModule,
    NzDividerModule,
    NzInputNumberModule,
    FormsModule,
    NzInputModule,
    NzButtonModule
  ],
  providers: [
    {
      provide: CartService,
      useClass: CartMockService
    }
  ]
})
export class EventsModule { }
