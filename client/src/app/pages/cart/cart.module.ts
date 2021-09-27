import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { CartRoutingModule } from './cart-routing.module';
import { ItemsComponent } from './items/items.component';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [ItemsComponent],
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzCardModule,
    CartRoutingModule
  ]
})
export class CartModule { }
