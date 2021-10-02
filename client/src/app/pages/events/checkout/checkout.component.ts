import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CartService} from "@approot/shared/services/cart.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ProductItem} from "@approot/shared/services/dtos/product.item";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {CartItemComponent} from "@approot/pages/events/shared/cart-item/cart-item.component";
import {CartItemFactory} from "@approot/pages/events/shared/cart-item/cart-item.factory";
import {CartDto} from "@approot/shared/services/dtos/cart.dto";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {EventsService} from "@approot/shared/services/events.service";
import {EventDto} from "@approot/shared/services/dtos/event.dto";
import {once} from "cluster";
import {filter, first} from "rxjs/operators";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  isLoading = true;
  @ViewChild('itemsContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<CartItemComponent>[] = [];
  dividerRef: ComponentRef<NzDividerComponent>[] = [];
  cartItems$: Observable<ProductItem[]>;
  cartSummary$: Observable<CartDto>;
  productSubscription: Subscription;
  eventInfo: EventDto;

  constructor(private cartService: CartService, private router: Router, private route: ActivatedRoute,
              private eventService: EventsService,
              private resolver: ComponentFactoryResolver) { }

  async ngOnInit(): Promise<void> {
    await this.refreshCartItems();
    await this.refreshOrderSummary();
    this.cartItems$ = this.cartService.productList$.asObservable();
    this.cartSummary$ = this.cartService.cartSummary$;
    this.cartService.cartSummary$
      .pipe(filter(s => !!s))
      .pipe(first())
      .subscribe((cartInfo) => {
        if (cartInfo && cartInfo.cartStatus == 'completed') {
          // cart is completed, just show user back to payment page
          this.navigateToEndPage()
        }
      });
  }

  async refreshCartItems(): Promise<void> {
    this.isLoading = true;
    this.resetItems();
    const eventId = this.route.snapshot.params.eventId;
    await this.cartService.refreshProducts(eventId);
    this.eventInfo = await this.eventService.getEventById(eventId);
  }

  async refreshOrderSummary(): Promise<void> {
    await this.cartService.loadCart();
  }

  resetItems(): void {
    if (this.container) {
      this.container.clear();
    }
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
    this.productSubscription = this.cartService.productList$
      .subscribe((items) => {
        if (items.length === 0) {
          return;
        }
        if (!this.container) {
          return;
        }
        this.isLoading = false;
        items.forEach((item, index) => {
          if (index > 0) {
            this.makeDividerComponent();
          }
          this.makeItemComponent(item);
        });
      });
  }

  makeItemComponent(item: ProductItem): void {
    const factory = CartItemFactory.GetComponentByItemType(this.resolver, item);
    const component = this.container.createComponent(factory);
    component.instance.cartItem = item;
    this.componentRef.push(component);
  }

  makeDividerComponent(): void {
    const dividerComponent = this.resolver.resolveComponentFactory(NzDividerComponent);
    const component = this.container.createComponent(dividerComponent);
    this.dividerRef.push(component);
  }

  onCheckoutClick(): void {
    const currentEventId = this.route.snapshot.params.eventId;
    this.router.navigate(['../../attendees'], { relativeTo: this.route, queryParams: { eventId: currentEventId } });
  }

  onBack(): void {
    this.router.navigate(['../../lobby'], { relativeTo: this.route });
  }

  navigateToEndPage(): void {
    this.router.navigate(['../../sessions'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
