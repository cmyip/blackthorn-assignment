import {CartItemTypeEnum} from '@approot/shared/services/enums/cart-item-type.enum';

export interface CartQuantityDto {
  item_id: number;
  quantity?: number;
  donationAmount?: number;
}

