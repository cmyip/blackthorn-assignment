import {ProductItem} from "@approot/shared/services/dtos/product.item";

export interface CartDto {
  cartCode: string;
  promoCode: string;
  subtotalAmount: number;
  taxAmount: number;
  totalAmount: number;
  cartItems: {
    productId: number,
    itemTitle: string,
    quantity: number,
    amount: number,
    isWaitlist: boolean
  }[];
}
