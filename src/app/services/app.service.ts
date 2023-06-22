import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private cartProductList: IProduct[] = [];

  constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<IProduct[]> {
    let url: string = 'https://fakestoreapi.com/products';
    return this.httpClient.get<IProduct[]>(url);
  }

  addToCart(product: IProduct) {
    const existingProduct = this.cartProductList.find(
      (cartProduct) => cartProduct.id === product.id
    );
    if (existingProduct && existingProduct.count && product && product.count) {
      existingProduct.count = product.count + 1;
    } else {
      product.count = 1;
      this.cartProductList.push(product);
    }
  }

  decreaseProductCount(product: IProduct) {
    const existingProduct = this.cartProductList.find(
      (cartProduct) => cartProduct.id === product.id
    );
    if (existingProduct && existingProduct.count && existingProduct.count > 1) {
      existingProduct.count = existingProduct.count - 1;
    } else if (existingProduct && existingProduct.count) {
      const index = this.cartProductList.indexOf(existingProduct);
      this.cartProductList.splice(index, 1);
    }
  }

  removeFromCart(product: IProduct): void {
    const existingProduct = this.cartProductList.find(
      (cartProduct) => cartProduct.id === product.id
    );
    if (existingProduct) {
      const index = this.cartProductList.indexOf(existingProduct);
      this.cartProductList.splice(index, 1);
    }
  }

  calculateTotalPrice(): number {
    return this.cartProductList.reduce((total, item) => total + (item.price * ((item || {}).count || 1)), 0);
  }

  getCartProducts() {
    return this.cartProductList;
  }
}
