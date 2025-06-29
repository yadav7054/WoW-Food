import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

   
    username:string='';
    isLoggedIn:boolean=false;
    authSubscription: Subscription | undefined;
    constructor(public _auth:AuthService,private _router:Router){}
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
    }
   
    logout(): void {
      this._auth.logout(); // Use the AuthService for logout
    }
    home():void{
      window.scrollTo(0, 0);
    }
    signin():void{
      window.scrollTo(0, 0);
    }
   
    signup():void{
      window.scrollTo(0, 0);
    }
    cart():void{
      window.scroll(0,0);
    }
}
