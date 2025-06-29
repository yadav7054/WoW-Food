import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../Services/cart.service';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  username:string='';
  isLoggedIn:boolean=false;
  authSubscription: Subscription | undefined;
  cartCount:number=0;

  constructor(public _auth:AuthService,private _router:Router,private _cart:CartService){}

  ngOnInit(): void {
    this.authSubscription = this._auth.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    );
    
    const userData =localStorage.getItem('currentUser');
    if(userData){
      const temp = JSON.parse(userData);
      this.username=temp.username;
    }

    this._cart.getCartCountObservable().subscribe(count=>{
      this.cartCount=count;
    });
    
  }
 
  logout(): void {
    this._auth.logout(); // Use the AuthService for logout
    window.scrollTo(0, 0);
  }
 
}
 
 
 