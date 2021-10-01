import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CartService} from "@approot/shared/services/cart.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductItem} from "@approot/shared/services/dtos/product.item";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {CartItemComponent} from "@approot/pages/events/shared/cart-item/cart-item.component";
import {CartItemFactory} from "@approot/pages/events/shared/cart-item/cart-item.factory";
import {CartSummaryDto} from "@approot/shared/services/dtos/cart-summary.dto";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  eventName = 'CU - Alumni Weekend';
  isLoading = true;
  @ViewChild('itemsContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<CartItemComponent>[] = [];
  dividerRef: ComponentRef<NzDividerComponent>[] = [];
  cartItems$: Observable<ProductItem[]>;
  cartSummary$: Observable<CartSummaryDto>;
  constructor(private cartService: CartService, private resolver: ComponentFactoryResolver) { }

  async ngOnInit(): Promise<void> {
    await this.refreshCartItems();
    await this.refreshOrderSummary();
    this.cartItems$ = this.cartService.productList$.asObservable();
    this.cartSummary$ = this.cartService.cartSummary$;
  }

  async refreshCartItems(): Promise<void> {
    this.isLoading = true;
    this.resetItems();
    await this.cartService.refreshProducts();
  }

  async refreshOrderSummary(): Promise<void> {
    await this.cartService.loadCart();
  }

  resetItems(): void {
    if (this.container) {
      this.container.clear();
    }
    this.cartService.productList$
      .subscribe((items) => {
        if (items.length === 0) {
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

  onBack(): void {}
}
