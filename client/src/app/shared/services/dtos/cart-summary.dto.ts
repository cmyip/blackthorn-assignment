import {CartItemDto} from "@approot/shared/services/dtos/cart-item.dto";

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
