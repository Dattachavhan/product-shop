import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../services/app.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let appService: AppService;

  const product = {
    id: 1,
    title: 'test',
    price: 10,
    description: 'description',
    category: 'cloth',
    image: '/assests/one.png',
    count: 5,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate and return the total price', () => {
    const expectedPrice = 100;
    spyOn(appService, 'calculateTotalPrice').and.returnValue(expectedPrice);
    const totalPrice = component.calculateTotalPrice();
    expect(totalPrice).toBe(expectedPrice);
    expect(appService.calculateTotalPrice).toHaveBeenCalled();
  });

  it('should add product to the cart', () => {
    spyOn(appService, 'addToCart');
    component.increaseProductCount(product);
    expect(appService.addToCart).toHaveBeenCalledWith(product);
  });

  it('should remove product from cart', () => {
    spyOn(appService, 'removeFromCart');
    component.removeFromCart(product);
    expect(appService.removeFromCart).toHaveBeenCalledWith(product);
  });

  it('should decrease the product count', () => {
    spyOn(appService, 'decreaseProductCount');
    component.decreaseProductCount(product);
    expect(appService.decreaseProductCount).toHaveBeenCalledWith(product);
  });
});
