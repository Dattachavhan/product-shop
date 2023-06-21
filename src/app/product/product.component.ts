import { Component, HostListener, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { AppService } from '../services/app.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  paginationProductList: IProduct[] = [];
  allProductList: IProduct[] = [];
  pageNumber = 1;

  constructor(
    private appService: AppService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body, html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    console.log('windowBottom',windowBottom, docHeight)
    if (windowBottom >= docHeight - 5) {
      this.pageNumber = this.pageNumber + 1;
      this.getNextProductList();
    }
  }

  private getNextProductList () : void{
    this.loaderService.showLoader();
    setTimeout(() => {
      const endIndex = this.pageNumber * 5  - 1;
      const startIndex = endIndex - 5;
      console.log(startIndex, endIndex, this.pageNumber);
      this.paginationProductList = this.paginationProductList.concat(this.allProductList.slice(startIndex, endIndex));
      this.loaderService.hideLoader();
    },5000)
   
  }

  private getProductList(): void {
    this.loaderService.showLoader();
    this.appService.getProducts().subscribe((res: IProduct[]) => {
      this.allProductList = res || [];
      this.paginationProductList = this.allProductList.slice(0, 5)
      this.loaderService.hideLoader();
    });
  }
}
