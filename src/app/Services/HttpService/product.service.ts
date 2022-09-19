import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../product';
// import products from '../assets/products.json'



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _url: string = "assets/products.json"

  constructor(private http: HttpClient) { }

  getProducts(){
    
    return  this.http.get(this._url)
  }
}
