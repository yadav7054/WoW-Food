// src/app/menu/menu.component.ts
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../Services/menu.service';
import { CartService } from '../Services/cart.service';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
 
  constructor(
    private menuService: MenuService,
    public cartService: CartService
  ) {}
 
  ngOnInit(): void {
    this.cartService.getItems2();
    this.menuService.getMenuItems().subscribe(items => {
      this.menuItems = items;
      console.log(this.menuItems);
    });
  }
 
  addToCart(item: any) {
    this.cartService.addToCart2(item);
    alert(`${item.name} added to cart!`);
  }
}
 
 
 