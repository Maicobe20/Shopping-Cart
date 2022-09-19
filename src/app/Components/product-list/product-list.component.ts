import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/HttpService/product.service';
import { Product } from '../../product'
import { CartServiceService } from 'src/app/Services/CartService/cart-service.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any = []
  cartList: any = []

  constructor(private ProductService: ProductService, private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.ProductService.getProducts()
      .subscribe(products => {
        this.products = products

        this.products.forEach((product: any) => {
          Object.assign(product, { quantity: product.quantity, total: product.price })
        })
      })
  }

  addToCart(product: any) {
    
let exist = false
    if (product.quantity != 0) {
      
      this.cartService.getProducts()
      .subscribe(items=>{
        if(items.length === 0){
          this.cartService.addToCart(product)
        }else{
        items.map((item:any)=>{
         
          if(product.itemId === item.itemId){
            Object.assign(item, { quantity: product.quantity , total: product.price })
            exist = true
          }
        })
        exist ? console.log("Luwis") : this.cartService.addToCart(product)
      }
      })
    
    } else {
     
    }
  }

  addQty(id: number) {
    this.products.forEach((product: any) => {
      if (product.itemId == id) {
        Object.assign(product, { quantity: product.quantity += 1, total: product.price * product.quantity })
      }
    })
  }

  subQty(id: number) {
    this.products.forEach((product: any) => {
      if (product.itemId == id && product.quantity > 0) {
        Object.assign(product, { quantity: product.quantity -= 1, total: product.price * product.quantity })
      }
    })
  }
}
