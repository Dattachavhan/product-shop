import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../services/app.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderService } from '../services/loader.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let appService: AppService;
  let toastrService: ToastrService;
  let loaderService: LoaderService;

  const product = {
    id: 1,
    title: 'test',
    price: 10,
    description: 'description',
    category: 'cloth',
    image: '/assests/one.png',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [ProductComponent],
      providers: [AppService, ToastrService],
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    toastrService = TestBed.inject(ToastrService);
    loaderService = TestBed.inject(LoaderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call appService.addToCart and toastr.success', () => {
    spyOn(appService, 'addToCart');
    component.addToCart(product);
    expect(appService.addToCart).toHaveBeenCalledWith(product);
    spyOn(toastrService, 'success');
    toastrService.success('Product added successfully to the cart!');
    expect(toastrService.success).toHaveBeenCalledWith(
      'Product added successfully to the cart!'
    );
  });

  it('should decrement currentPage by 1 when currentPage > 1', () => {
    component.currentPage = 2;
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should not decrement currentPage when currentPage is 1', () => {
    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should increment currentPage by 1 when currentPage < totalPageCount', () => {
    component.currentPage = 2;
    component.totalPageCount = 4;
    component.nextPage();
    expect(component.currentPage).toBe(3);
  });

  it('should not increment currentPage when currentPage is totalPageCount', () => {
    component.currentPage = 2;
    component.totalPageCount = 2;
    component.nextPage();
    expect(component.currentPage).toBe(2);
  });
});
