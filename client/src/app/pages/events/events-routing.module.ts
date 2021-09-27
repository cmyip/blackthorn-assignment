import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CheckoutComponent} from '@approot/pages/events/checkout/checkout.component';

const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: '**',
    redirectTo: 'checkout',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
