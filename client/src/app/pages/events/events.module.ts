import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { CartSummaryComponent } from './shared/cart-summary/cart-summary.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzCardModule} from 'ng-zorro-antd/card';
import {CartService} from '@approot/shared/services/cart.service';
import {CartApiService} from '@approot/shared/services/cart-api.service';
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import { BookItemComponent } from './shared/cart-item/book-item/book-item.component';
import {CartItemComponent} from "@approot/pages/events/shared/cart-item/cart-item.component";
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { DonateItemComponent } from './shared/cart-item/donate-item/donate-item.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzButtonModule} from "ng-zorro-antd/button";
import { AttendeesComponent } from './attendees/attendees.component';
import {NzStepsModule} from "ng-zorro-antd/steps";
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { AttendeeDetailsComponent } from './shared/attendee-details/attendee-details.component';
import { VipDetailsComponent } from './shared/attendee-details/vip-details/vip-details.component';
import { SessionsComponent } from './sessions/sessions.component';
import { LobbyComponent } from './lobby/lobby.component';

@NgModule({
  declarations: [
    CartSummaryComponent,
    CheckoutComponent,
    BookItemComponent,
    CartItemComponent,
    DonateItemComponent,
    AttendeesComponent,
    AttendeeDetailsComponent,
    VipDetailsComponent,
    SessionsComponent,
    LobbyComponent
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
    NzButtonModule,
    NzStepsModule,
    NzRadioModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: CartService,
      useClass: CartApiService
    }
  ]
})
export class EventsModule { }
