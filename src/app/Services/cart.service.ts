// src/app/services/cart.service.ts
import { HttpClient } from '@angular/common/http';
import { ExpressionType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartList: any[] = [];
  mapList: any[] = [];
  productList: any[] = [];
  total: number = 0;
  cartCount= new BehaviorSubject<number>(0);

  constructor(private _http: HttpClient, private router: Router) { }

  getItems2() {
    let user = localStorage.getItem("currentUser");
    if (user == null) {
      this.router.navigateByUrl("/signin");
      return;
    }
    const id = JSON.parse(user).id;
    this.getMapList(id);
  }

  getMapList(id: number): void {
    this._http.get<any[]>(`http://localhost:3000/map/?userId=${id}`).subscribe(data => {
      this.mapList = data;
      this.getProductList();
    });
  }

  getProductList(): void {
    this._http.get<any[]>("http://localhost:3000/menuItems").subscribe(data => {
      this.productList = data;
      this.getCartList();
    });
  }

  getCartList(): void {
    // console.log(this.productList);
    // console.log(this.mapList);
    this.cartList = [];
    for (let i = 0; i < this.mapList.length; i++) {
      let x = this.productList.find(product => {
        // console.log(product.id + " " + this.mapList[i].productId);
        return product.id == this.mapList[i].productId;
      });
      // console.log(x);
      this.cartList.push({
        id: x.id,
        quantity: this.mapList[i].productCount,
        image: x.image,
        price: x.price,
        name: x.name
      });
    }
    this.getTotal();
    this.updateCartCount();
  }

  updateCartCount():void{
    let count=0;
    for(let item of this.cartList){
      count+=item.quantity;
    }
    this.cartCount.next(count);
  }

  getCartCountObservable(){
    return this.cartCount.asObservable();
  }

  addToCart2(item: any) {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const id = JSON.parse(user).id;
      const existing = this.cartList.find(i => i.name === item.name);
      // console.log(this.cartList);
      if (existing) {
        existing.quantity += 1;
        this._http.get<any>(`http://localhost:3000/map/?productId=${item.id}&userId=${id}`).subscribe(res => {
          console.log(res);
          this._http.put(`http://localhost:3000/map/${res[0].id}`, { userId: id, productId: item.id, productCount: existing.quantity }).subscribe(response => {
            console.log(response);
            this.updateCartCount();
          });
        });
      }
      else {
        let newObj = {
          productId: item.id,
          userId: id,
          productCount: 1
        };
        // console.log(newObj);
        this.cartList.push({
          id: item.id,
          quantity: 1,
          image: item.image,
          price: item.price,
          name: item.name
        })
        this._http.post<any>("http://localhost:3000/map", newObj).subscribe(result => {
          console.log(result);
          this.updateCartCount();
        });
      }
    }
    this.getTotal();
  }

  removeItem(itemToRemove: any) {
    this.cartList = this.cartList.filter(cart => {
      return cart.id != itemToRemove.id;
    });
    const user = localStorage.getItem("currentUser");
    if (user) {
      const id = JSON.parse(user).id;
      this._http.get<any>(`http://localhost:3000/map/?productId=${itemToRemove.id}&userId=${id}`).subscribe(res => {
        console.log(res);
        this._http.delete(`http://localhost:3000/map/${res[0].id}`).subscribe(response => {
          console.log(response);
          this.updateCartCount();
        });
      });
    }
  }

  getTotal(): void {
    this.total = 0;
    for (let i = 0; i < this.cartList.length; i++) {
      this.total += Number(this.cartList[i].price) * Number(this.cartList[i].quantity);
    }
    console.log(this.total);
  }

  decrementQuantity(item: any): void {
    if (item.quantity == 1) {
      this.removeItem(item);
      return;
    }
    let user = localStorage.getItem("currentUser");
    if (user) {
      let userId = JSON.parse(user).id;
      let newData = {
        userId: userId,
        productId: item.id,
        productCount: item.quantity - 1
      }
      this.cartList = this.cartList.map(prod => {
        if (prod.id == item.id) {
          prod.quantity = item.quantity - 1;
          this.getTotal();
        }
        return prod;
      });
      console.log(newData);
      this._http.get<any>(`http://localhost:3000/map/?productId=${item.id}&userId=${userId}`).subscribe(res => {
        console.log(res);
        this._http.put(`http://localhost:3000/map/${res[0].id}`, newData).subscribe(response => {
          console.log(response);
        });
      });
    }
  }

  getItems(): any[] {
    return this.cartList;
  }
   
  clearCart(): void {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const id = JSON.parse(user).id;
      this._http.get<any[]>(`http://localhost:3000/map/?userId=${id}`).subscribe(data => {
        data.forEach(entry => {
          this._http.delete(`http://localhost:3000/map/${entry.id}`).subscribe();
        });
      });
    }
    // Clear local cart and reset total
    this.cartList = [];
    this.total = 0;
  }

  
}


