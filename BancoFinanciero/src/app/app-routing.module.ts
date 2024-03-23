import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';

const routes: Routes = [

  {
    path: '', loadChildren: ()=>import('./list-products/list-products.module').then(m => m.ListProductsModule)
  },
  {
    path: 'product', loadChildren: ()=>import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path:'header',
    component: HeaderComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
