import {CartItemTypeEnum} from '@approot/shared/services/enums/cart-item-type.enum';

export interface ProductItem {
  id: number;
  title: string;
  description: string;
  price?: number;
  itemType: CartItemTypeEnum;
  numberAvailable?: number;
  salesEndDate?: Date;
  imgUrl?: string;
}

