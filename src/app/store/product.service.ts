import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { API_URL } from '../core/api-url';

export interface Product {
  id: number;
  sku?: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock?: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Product[]>(`${API_URL}/products`);
  }

  getById(id: number) {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }
}
