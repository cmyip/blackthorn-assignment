import {ComponentFactory, ComponentFactoryResolver} from '@angular/core';
import {CartItemDto} from '@approot/shared/services/dtos/cart-item.dto';
import {CartItemTypeEnum} from '@approot/shared/services/enums/cart-item-type.enum';
import {BookItemComponent} from '@approot/pages/events/shared/cart-item/book-item/book-item.component';
import {CartItemComponent} from '@approot/pages/events/shared/cart-item/cart-item.component';
import {DonateItemComponent} from '@approot/pages/events/shared/cart-item/donate-item/donate-item.component';

export class CartItemFactory {
  static GetComponentByItemType(resolver: ComponentFactoryResolver, cartItem: CartItemDto): ComponentFactory<CartItemComponent> {
    switch (cartItem.itemType) {
      case CartItemTypeEnum.Book:
        return resolver.resolveComponentFactory(BookItemComponent);
      case CartItemTypeEnum.Donation:
        return resolver.resolveComponentFactory(DonateItemComponent);
      default:
        return resolver.resolveComponentFactory(CartItemComponent);
    }
  }
}
