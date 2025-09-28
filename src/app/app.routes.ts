import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    loadComponent: () => import('./menu/menu.page').then((m) => m.MenuPage),
    children: [
      {
        path: 'shop',
        loadComponent: () => import('./shop/shop.page').then((m) => m.ShopPage),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./shop/product-detail.page').then((m) => m.ProductDetailPage),
      },
      {
        path: 'cart',
        loadComponent: () => import('./shop/cart.page').then((m) => m.CartPage),
      },
      {
        path: 'checkout',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./shop/checkout.page').then((m) => m.CheckoutPage),
      },
      {
        path: 'orders',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./shop/orders.page').then((m) => m.OrdersPage),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./auth/profile.page').then((m) => m.ProfilePage),
      },
      { path: '', pathMatch: 'full', redirectTo: 'shop' },
    ],
  },
  { path: '**', redirectTo: '' },
];
