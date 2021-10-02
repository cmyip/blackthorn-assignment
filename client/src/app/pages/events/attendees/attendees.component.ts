import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {CartDto} from "@approot/shared/services/dtos/cart.dto";
import {CartService} from "@approot/shared/services/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AttendeesDto} from "@approot/shared/services/dtos/attendees.dto";
import {ProductItem} from "@approot/shared/services/dtos/product.item";
import {CartItemFactory} from "@approot/pages/events/shared/cart-item/cart-item.factory";
import {CartItemComponent} from "@approot/pages/events/shared/cart-item/cart-item.component";
import {AttendeeFormFactory} from "@approot/pages/events/shared/attendee-details/attendee-form.factory";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss']
})
export class AttendeesComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  currentStep = 0;
  cartSummary$: Observable<CartDto>;
  componentRef: ComponentRef<CartItemComponent>[] = [];
  attendeeSubscription: Subscription;
  attendeeListForm: FormGroup;

  @ViewChild('formElementContainer', { read: ViewContainerRef }) container;

  constructor(private cartService: CartService, private router: Router, private route: ActivatedRoute,
              private fb: FormBuilder,
              private resolver: ComponentFactoryResolver) {
    this.cartSummary$ = this.cartService.cartSummary$.asObservable();
    this.isLoading$ = this.cartService.attendeesListIsLoading$.asObservable();
    this.attendeeListForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartService.refreshAttendees();
    if (this.attendeeSubscription) {
      this.attendeeSubscription.unsubscribe();
    }
    this.attendeeSubscription = this.cartService.attendeesList$.subscribe((attendeeList) => {
      if (!this.container) {
        return;
      }
      for (const attendeeIndex in attendeeList) {
        const attendee = attendeeList[attendeeIndex];
        this.makeItemComponent(attendee, Number(attendeeIndex));
      }
    });
  }

  makeItemComponent(item: AttendeesDto, attendeeNumber: number): void {
    const factory = AttendeeFormFactory.GetComponentByItemType(this.resolver, item);
    const component = this.container.createComponent(factory);
    component.instance.attendeeDto = item;
    component.instance.attendeeNumber = attendeeNumber;
    component.instance.formReady.subscribe((formComponent) => {
      this.attendeeListForm.addControl(attendeeNumber.toString(), formComponent);
    });
    // this.attendeeListForm.addControl(attendeeNumber.toString(), component.instance.attendeeForm);
    this.componentRef.push(component);
  }

  async onReviewSessionClick(): Promise<void> {
    const formData = this.attendeeListForm.getRawValue();
    const listIndexes = Object.keys(formData);
    const existingAttendees = this.cartService.attendeesList$.value;
    const attendeesList = listIndexes.map((formKey) => {
      const updateDto = new AttendeesDto();
      const attendeeForm = formData[formKey];
      const existingAttendee = existingAttendees[Number(formKey)];
      Object.assign(updateDto, { ...attendeeForm, id: existingAttendee.id});
      return updateDto;
    });
    await this.cartService.updateAttendees(attendeesList);
    this.navigateToNextPage();
  }

  onBack(): void {
    const eventId = this.route.snapshot.queryParams.eventId;
    this.router.navigate(['../checkout', eventId], {relativeTo: this.route});
  }

  navigateToNextPage() {
    const eventId = this.route.snapshot.queryParams.eventId;
    this.router.navigate(['../sessions'], {relativeTo: this.route, queryParams: { eventId }});
  }

  ngOnDestroy(): void {
    this.attendeeSubscription.unsubscribe();
  }

}
