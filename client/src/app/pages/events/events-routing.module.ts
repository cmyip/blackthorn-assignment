import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CheckoutComponent} from '@approot/pages/events/checkout/checkout.component';
import {AttendeesComponent} from "@approot/pages/events/attendees/attendees.component";
import {SessionsComponent} from "@approot/pages/events/sessions/sessions.component";
import {LobbyComponent} from "@approot/pages/events/lobby/lobby.component";

const routes: Routes = [
  {
    path: 'lobby',
    component: LobbyComponent
  },
  {
    path: 'attendees',
    component: AttendeesComponent
  },
  {
    path: 'checkout/:eventId',
    component: CheckoutComponent
  },
  {
    path: 'sessions',
    component: SessionsComponent
  },
  {
    path: '**',
    redirectTo: 'lobby',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
