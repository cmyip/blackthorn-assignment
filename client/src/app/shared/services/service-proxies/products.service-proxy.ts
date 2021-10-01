import {Injectable} from "@angular/core";
import {BaseService} from "@approot/shared/services";
import {ProductItem} from "@approot/shared/services/dtos/product.item";

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceProxy {
  constructor(private baseService: BaseService) { }

  getProducts(): Promise<ProductItem[]> {
    return this.baseService.get('/products').toPromise();
  }
}
