import { Component, OnInit } from '@angular/core';

import { CartService } from '../Services/cart.service'; // Adjust path

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})

export class OrderSummaryComponent implements OnInit {

  cartItems: any[] = [];
  subtotal = 0;
  tax = 0;
  discount = 0.5;
  total = 0;
  feedback: string = '';
  userId: string | null =null;

  constructor(private cartService: CartService, private router: Router,private _http:HttpClient) {}


  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.calculateBill();
    this.orderHistory();
  }
 
  calculateBill(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.tax = this.subtotal * 0.05;        // 5% tax
    this.discount = this.subtotal > 500 ? this.subtotal * 0.25 : 0; // 25% discount for orders > ₹500
    this.total = this.subtotal + this.tax - this.discount;
  }
 
  submitFeedback(): void {
    this.feedback = '';
    alert('Thank you for your feedback!');
  }
 
  orderAgain(): void {
    this.cartService.clearCart();
    this.router.navigate(['/menu']);
  }  

  orderHistory(): void {
    let user = localStorage.getItem("currentUser");
    if (!user) {
      this.router.navigateByUrl("/signin");
      return;
    }
    const userId = JSON.parse(user).id;
    const orderData={
      userId:userId,
      items:this.cartItems,
      total:this.total,
      date: new Date().toISOString()
    };
    this._http.post("http://localhost:3000/orders",orderData).subscribe(()=>{
      console.log("History saved");
    });
  }
}

 