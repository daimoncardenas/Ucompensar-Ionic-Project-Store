import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle,
  IonButtons, IonMenuButton, IonButton,
  IonIcon, IonBadge, IonContent, IonText,
  IonItem, IonLabel, IonInput, IonImg
} from '@ionic/angular/standalone';
import { CartService } from '../store/cart.service';
import { Product, ProductService } from '../store/product.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonHeader, IonToolbar, IonTitle,
    IonButtons, IonMenuButton, IonButton,
    IonIcon, IonBadge, IonContent, IonText,
    IonItem, IonLabel, IonInput, IonImg
  ],
})
export class ProductDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  cart = inject(CartService);

  product?: Product;
  qty = 1;
  loading = true;
  error = '';

  async ngOnInit() {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.product = await firstValueFrom(this.productService.getById(id));
    } catch {
      this.error = 'Failed to load product';
    } finally {
      this.loading = false;
    }
  }

  add() {
    if (!this.product) return;
    this.cart.add(this.product, Math.max(1, this.qty));
  }
}