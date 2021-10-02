import {Component, ComponentRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {CartDto} from "@approot/shared/services/dtos/cart.dto";
import {CartItemComponent} from "@approot/pages/events/shared/cart-item/cart-item.component";
import {FormGroup} from "@angular/forms";
import {AttendeesDto} from "@approot/shared/services/dtos/attendees.dto";
import {CartService} from "@approot/shared/services/cart.service";

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  isLoading$;
  cartSummary$: Observable<CartDto>;
  attendeeList$: Observable<AttendeesDto[]>;
  currentStep = 1;

  constructor(private router: Router, private route: ActivatedRoute, private cartService: CartService) {
    this.attendeeList$ = this.cartService.attendeesList$.asObservable();
    this.cartSummary$ = this.cartService.cartSummary$.asObservable();
    this.isLoading$ = this.cartService.attendeesListIsLoading$.asObservable();
    this.cartService.cartSummary$.subscribe((summary) => {
      if (summary && summary.cartStatus == 'completed') {
        this.currentStep = 2;
      }
    })
  }

  async ngOnInit(): Promise<void> {
    await this.cartService.refreshAttendees();
    await this.cartService.loadCart();
  }

  onBack(): void {
    const eventId = this.route.snapshot.queryParams.eventId;
    this.router.navigate(['../attendees'], {relativeTo: this.route, queryParams: { eventId }});
  }

  async onPaymentClick(): Promise<void> {
    await this.cartService.checkoutCart();
    this.currentStep = 2;
  }

  onBackToEvent(): void {
    this.router.navigate(['../lobby'], {relativeTo: this.route});
  }
}
