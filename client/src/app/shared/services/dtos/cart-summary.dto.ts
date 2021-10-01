import {ProductItem} from "@approot/shared/services/dtos/product.item";

export interface CartSummaryDto {
  cartCode: string;
  promoCode: string;
  subtotalAmount: number;
  taxAmount: number;
  totalAmount: number;
  cartItems: {
    itemId: number,
    itemTitle: string,
    quantity: number,
    amount: number,
    isWaitlist: boolean
  }[];
}
