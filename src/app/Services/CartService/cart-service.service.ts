import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  public cartList: any = []
  private productList = new BehaviorSubject<any>([])

  constructor() { }

  getProducts(){
    return this.productList.asObservable()
  }


  addToCart(product:any){
    this.cartList.push(product)
    this.productList.next(this.cartList)
    this.getTotalPrice()
   
  }

  getTotalPrice(): number{
    let total = 0
    this.cartList.map((a:any)=>{
      total += (a.quantity * a.price)
    })
    return total
  }

  clearCart(){
    this.cartList = []
    this.productList.next(this.cartList)
  }


}
