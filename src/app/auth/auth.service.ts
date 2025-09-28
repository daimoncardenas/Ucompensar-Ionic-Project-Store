import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../environments/environment';
import { API_URL } from '../core/api-url';

@Injectable({ providedIn: 'root' })
export class AuthService {
  token = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  async init() {
    const { value } = await Preferences.get({ key: 'auth_token' });
    this.token.set(value);
  }

  getTokenSync() {
    return this.token();
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(
      `${API_URL}/auth/login`,
      credentials
    );
  }

  async setToken(token: string) {
    await Preferences.set({ key: 'auth_token', value: token });
    this.token.set(token);
  }

  async logout() {
    await Preferences.remove({ key: 'auth_token' });
    this.token.set(null);
  }
}
