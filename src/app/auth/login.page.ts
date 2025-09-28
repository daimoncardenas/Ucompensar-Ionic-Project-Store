import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonList, IonText } from '@ionic/angular/standalone';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonList, IonText],
})
export class LoginPage {
  email = 'demo@demo.com';
  password = '1234567';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async submit() {
    this.loading = true;
    this.error = '';
    try {
      const res = await firstValueFrom(this.auth.login({ email: this.email, password: this.password }));
      await this.auth.setToken(res.token);
      await this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
    } catch (e) {
      this.error = 'Credenciales inválidas. Inténtalo de nuevo.';
    } finally {
      this.loading = false;
    }
  }
}
