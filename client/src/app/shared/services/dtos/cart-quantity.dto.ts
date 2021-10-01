import {CartItemTypeEnum} from '@approot/shared/services/enums/cart-item-type.enum';

export interface CartQuantityDto {
  productId: number;
  quantity?: number;
  donationAmount?: number;
}

