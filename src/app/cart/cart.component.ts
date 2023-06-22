import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { IProduct } from '../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private appService : AppService){}

  cartProductList : IProduct[] = [];

  ngOnInit(): void {
    this.getCartProducts();
  }

  private getCartProducts () : void{
    this.cartProductList = this.appService.getCartProducts();
  }

  public increaseProductCount(product : IProduct) : void {
    this.appService.addToCart(product);
  }

  public decreaseProductCount(product: IProduct) : void {
    this.appService.decreaseProductCount(product);
  }

  public removeFromCart(product: IProduct) : void {
    this.appService.removeFromCart(product);
  }

  public calculateTotalPrice(): number {
    return this.appService.calculateTotalPrice();
  }
  
}
