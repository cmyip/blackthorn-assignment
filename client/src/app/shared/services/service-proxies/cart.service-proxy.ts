import {Injectable} from "@angular/core";
import {BaseService} from "@approot/shared/services";
import {ProductItem} from "@approot/shared/services/dtos/product.item";
import {CartDto} from "@approot/shared/services/dtos/cart.dto";
import {CartQuantityDto} from "@approot/shared/services/dtos/cart-quantity.dto";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CartServiceProxy {
  constructor(private baseService: BaseService) { }

  getCart(cartCode): Promise<CartDto> {
    return this.baseService.get(`/carts/${cartCode}`).toPromise();
  }
  createCart(): Promise<CartDto> {
    return this.baseService.post(`/carts`).toPromise();
  }
  updateCart(cartCode, cartOrder: CartQuantityDto[]): Promise<CartDto> {
    return this.baseService.put(`/carts/${cartCode}`, {itemList: cartOrder}).toPromise();
  }
}
