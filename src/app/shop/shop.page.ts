import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonButton,
  IonIcon, IonBadge, IonContent, IonText,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonImg
} from '@ionic/angular/standalone';
import { CartService } from '../store/cart.service'; // adjust path if needed
import { Product, ProductService } from '../store/product.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-shop',
  standalone: true,
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton,
    IonIcon, IonBadge, IonContent, IonText,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonImg
  ],
})
export class ShopPage implements OnInit{
  private productService = inject(ProductService);
  cart = inject(CartService);

  products: Product[] = [];
  loading = true;
  error = '';

  async ngOnInit() {
    try {
      this.loading = true;
      this.products = await firstValueFrom(this.productService.list());
    } catch {
      this.error = 'Failed to load products';
    } finally {
      this.loading = false;
    }
  }

  addToCart(p: Product) {
    this.cart.add(p, 1);
  }
}

