import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductsRoutingModule } from './list-products-routing.module';
import { ListComponent } from './components/list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListProductsRoutingModule
  ]
})
export class ListProductsModule { }
