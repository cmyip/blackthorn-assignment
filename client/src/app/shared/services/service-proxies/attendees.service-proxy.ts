import {Injectable} from "@angular/core";
import {BaseService} from "@approot/shared/services";
import {ProductItem} from "@approot/shared/services/dtos/product.item";
import {CartDto} from "@approot/shared/services/dtos/cart.dto";
import {CartQuantityDto} from "@approot/shared/services/dtos/cart-quantity.dto";
import {map} from "rxjs/operators";
import {AttendeesDto} from "@approot/shared/services/dtos/attendees.dto";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AttendeesServiceProxy {
  constructor(private baseService: BaseService) { }

  getAttendees(cartCode: string): Promise<AttendeesDto[]> {
    return this.baseService.get(`/attendees`, {cartCode}).toPromise();
  }

  updateAttendees(cartCode: string, attendees: AttendeesDto[]): Promise<AttendeesDto[]> {
    return this.baseService.put(`/attendees/bulk`, {attendees}, {cartCode}).toPromise();
  }
}
