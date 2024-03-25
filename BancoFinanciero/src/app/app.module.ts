import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from './services/interceptor.interceptor';
import { ListProductsModule } from './list-products/list-products.module';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ListProductsModule,
    ProductModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:InterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
