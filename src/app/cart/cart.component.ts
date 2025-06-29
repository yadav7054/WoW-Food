// src/app/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getItems2();
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  removeItem(item: any) {
    this.cartService.removeItem(item);
    // Refresh the view
  }

  increaseQty(item: any) {
    this.cartService.addToCart2(item);
  }

  decreaseQty(item: any) {
    this.cartService.decrementQuantity(item);
  }

}


