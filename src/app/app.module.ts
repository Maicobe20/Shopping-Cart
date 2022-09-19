import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductService } from './Services/HttpService/product.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CartComponent } from './Components/cart/cart.component'
import { RequestInterceptor } from './interceptor/request.interceptor';
import { SpinnerComponent } from './Components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
   
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
