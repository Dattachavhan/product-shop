import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../models/product';
import { AppService } from '../services/app.service';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  currentProductList: IProduct[] = [];
  allProductList: IProduct[] = [];
  @ViewChild('productListContainer') productListContainer!: ElementRef;
  pageSize = 5;
  currentPage = 1;
  totalPageCount = 0;

  constructor(
    private appService: AppService,
    private loaderService: LoaderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  public addToCart(product : IProduct) : void{
    this.appService.addToCart(product);
    this.toastr.success('Product added successfully to the cart!');
  }

  private getProductList(): void {
    this.loaderService.showLoader();
    this.appService.getProducts().subscribe(
      (res: IProduct[]) => {
        this.allProductList = res || [];
        this.totalPageCount = Math.ceil(
          this.allProductList.length / this.pageSize
        );
        this.setCurrentProducts();
        this.loaderService.hideLoader();
      },
      (err: any) => {
        this.loaderService.hideLoader();
      }
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setCurrentProducts();
      this.scrollToTop();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPageCount) {
      this.currentPage++;
      this.setCurrentProducts();
      this.scrollToTop();
    }
  }

  setCurrentProducts() {
    this.loaderService.showLoader();
    setTimeout(() => {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.currentProductList = this.allProductList.slice(startIndex, endIndex);
      this.loaderService.hideLoader();
    },500);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
