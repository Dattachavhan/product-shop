import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent,
    title: 'Shopping | Product',
    data: { page: 'product' },
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Shopping | Cart',
    data: { page: 'cart' },
  },
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
