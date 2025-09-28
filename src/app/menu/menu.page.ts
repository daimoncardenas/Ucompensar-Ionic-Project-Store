import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonBadge,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cart, home, person, receipt, logOut, menu } from 'ionicons/icons';
import { CartService } from '../store/cart.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonMenuToggle,
    IonIcon,
    IonLabel,
    IonBadge,
    IonRouterOutlet,   // <- el outlet principal
  ],
})
export class MenuPage {
  cart = inject(CartService);
  auth = inject(AuthService);
  router = inject(Router);

  constructor() {
    addIcons({ cart, home, person, receipt, logOut, menu });
    effect(() => {
      const token = this.auth.token();
      if (!token && this.router.url !== '/login') {
        void this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });
  }

  async logout() {
    await this.auth.logout();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
