import { Injectable, computed, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Product } from './product.service';

export interface CartItem { product: Product; qty: number; }
const CART_KEY = 'cart_items';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>([]);
  totalItems = computed(() => this.items().reduce((a, i) => a + i.qty, 0));
  totalPrice = computed(() => this.items().reduce((a, i) => a + i.qty * i.product.price, 0));

  async init() {
    const { value } = await Preferences.get({ key: CART_KEY });
    if (value) this.items.set(JSON.parse(value));
  }

  private async persist() {
    await Preferences.set({ key: CART_KEY, value: JSON.stringify(this.items()) });
  }

  add(product: Product, qty = 1) {
    const list = [...this.items()];
    const idx = list.findIndex(i => i.product.id === product.id);
    if (idx > -1) list[idx] = { ...list[idx], qty: list[idx].qty + qty };
    else list.unshift({ product, qty });
    this.items.set(list);
    void this.persist();
  }

  setQty(productId: number, qty: number) {
    const list = this.items().map(i => i.product.id === productId ? { ...i, qty } : i).filter(i => i.qty > 0);
    this.items.set(list);
    void this.persist();
  }

  remove(productId: number) {
    this.items.set(this.items().filter(i => i.product.id !== productId));
    void this.persist();
  }

  clear() { this.items.set([]); void this.persist(); }
}