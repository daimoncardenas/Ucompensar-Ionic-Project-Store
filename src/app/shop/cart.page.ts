import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonButton,
  IonIcon, IonBadge, IonContent, IonText,
  IonList, IonItem, IonLabel, IonInput
} from '@ionic/angular/standalone';
import { CartService } from '../store/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton,
    IonIcon, IonBadge, IonContent, IonText,
    IonList, IonItem, IonLabel, IonInput
  ],
})
export class CartPage {
  cart = inject(CartService);
  router = inject(Router);

  setQty(id: number, newQty: string | number) {
    const qty = Math.max(0, Number(newQty) || 0);
    this.cart.setQty(id, qty);
  }

  checkout() {
    this.router.navigateByUrl('/checkout');
  }
}