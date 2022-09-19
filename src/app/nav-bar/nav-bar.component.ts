import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../Services/CartService/cart-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  cartQty: number = 0
  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {
   this.cartService.getProducts()
   .subscribe(res=>{
    this.cartQty = res.length
   })
  }

}
