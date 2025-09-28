import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonButton,
  IonIcon, IonBadge, IonContent, IonText,
  IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { CartService } from '../store/cart.service';
import { Order, OrderService } from '../store/order.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton,
    IonIcon, IonBadge, IonContent, IonText,
    IonList, IonItem, IonLabel
  ],
})
export class OrdersPage implements OnInit {
  private orders = inject(OrderService);
  cart = inject(CartService);
  
  list: Order[] = [];
  loading = true;
  error = '';

  async ngOnInit() {
    try {
      this.loading = true;
      this.list = await firstValueFrom(this.orders.list());
    } catch {
      this.error = 'Failed to load orders';
    } finally {
      this.loading = false;
    }
  }
}