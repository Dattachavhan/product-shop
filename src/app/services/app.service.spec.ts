import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppService', () => {
  let service: AppService;

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
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to the cart when product does not exist', () => {
    service.addToCart(product);
    expect(service.getCartProducts()).toEqual([product]);
  });

  it('should remove product from the cart', () => {
    service.removeFromCart(product);
    expect(service.getCartProducts()).toEqual([]);
  });

  // it('should decrease product count when count is greater than 1', () => {
  //   service.decreaseProductCount(product);
  //   expect(service.getCartProducts()).toEqual([]);
  // });

  it('should remove product when count is 1', () => {
    service.decreaseProductCount(product);
    expect(service.getCartProducts()).toEqual([]);
  });
});
