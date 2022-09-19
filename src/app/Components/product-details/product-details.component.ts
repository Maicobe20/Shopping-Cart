import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/HttpService/product.service';
import { Product } from '../../product';
import { CartServiceService } from 'src/app/Services/CartService/cart-service.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  product: Product | undefined
  products: any = []

  constructor(private route: ActivatedRoute, private ProductService: ProductService, private cartService: CartServiceService) { 
  }

  ngOnInit(): void {

    const itemId:any = this.route.snapshot.paramMap.get('itemId')

     this.ProductService.getProducts().subscribe(products=>{
     this.products = products
    this.product = this.products.find((item:Product)=> item.itemId == itemId)
    })
     
  }
  addToCart(product: any) {


    if (product.quantity != 0) {
      this.cartService.addToCart(product)
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
