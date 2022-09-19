import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/product';
import { CartServiceService } from 'src/app/Services/CartService/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: Product[] = []
  grandTotal: number = 0
  products: any[] = []

  constructor(private cartService: CartServiceService) { }


  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.cartList = res
        this.grandTotal = this.cartService.getTotalPrice()
      })

    this.cartService.getProducts()
      .subscribe(products => {
        this.products = products

        this.products.forEach((product: any) => {
          Object.assign(product, { quantity: product.quantity, total: product.price })
        })
      })
  }

  addQty(id: number) {
    this.products.forEach((product: any) => {
      if (product.itemId == id) {
        Object.assign(product, { quantity: product.quantity += 1, total: product.price * product.quantity })
      }
    })
    this.grandTotal = this.cartService.getTotalPrice()
  }


  subQty(id: number) {
    this.products.forEach((product: any) => {
      if (product.itemId == id && product.quantity > 0) {
        Object.assign(product, { quantity: product.quantity -= 1, total: product.price * product.quantity })
      }
    })
    this.grandTotal = this.cartService.getTotalPrice()
  }

  checkOut(){
    alert("Purchase Success")
    this.cartService.clearCart()
  }

}
