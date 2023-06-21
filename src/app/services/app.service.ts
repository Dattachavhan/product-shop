import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class AppService {


  constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<IProduct[]> {
    let url: string = 'https://fakestoreapi.com/products';
    return this.httpClient.get<IProduct[]>(url);
  }
}
