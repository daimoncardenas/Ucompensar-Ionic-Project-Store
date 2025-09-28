import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonButton,
  IonIcon, IonBadge, IonContent, IonText,
  IonList, IonItem, IonLabel, IonInput
} from '@ionic/angular/standalone';
import { CartService } from '../store/cart.service';
import { OrderService } from '../store/order.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton,
    IonIcon, IonBadge, IonContent, IonText,
    IonList, IonItem, IonLabel, IonInput
  ],
})
export class CheckoutPage {
  cart = inject(CartService);
  orders = inject(OrderService);
  router = inject(Router);

  name = '';
  address = '';
  city = '';
  country = '';
  loading = false;
  error = '';

  async submit() {
    if (this.cart.totalItems() === 0) return;
    this.loading = true;
    this.error = '';
    try {
      const payload = {
        items: this.cart.items().map(i => ({ productId: i.product.id, qty: i.qty })),
        shipping: { name: this.name, address: this.address, city: this.city, country: this.country }
      };
      await firstValueFrom(this.orders.create(payload));
      this.cart.clear();
      await this.router.navigateByUrl('/orders', { replaceUrl: true });
    } catch {
      this.error = 'Failed to place order';
    } finally {
      this.loading = false;
    }
  }
}