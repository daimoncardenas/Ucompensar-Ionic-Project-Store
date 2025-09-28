import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { API_URL } from '../core/api-url';

export interface OrderItemPayload { productId: number; qty: number; }
export interface CreateOrderPayload {
  items: OrderItemPayload[];
  shipping: { name: string; address: string; city: string; country: string };
}

export interface Order {
  id: number;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  create(payload: CreateOrderPayload) {
    return this.http.post<Order>(`${API_URL}/orders`, payload);
  }

  list() {
    return this.http.get<Order[]>(`${API_URL}/orders`);
  }
}
