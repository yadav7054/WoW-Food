import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedInSubject = new BehaviorSubject<boolean>(this.checkInitialLoginStatus());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private _router:Router,private _http:HttpClient) { }

  register(username:string,password:string){
    const user = {username,password};
    this._http.post('http://localhost:3000/users',user).subscribe(res=>{console.log(res);
      this._router.navigateByUrl("/signin");
    });
  }
  
  login(user:any):void{
    localStorage.setItem('currentUser',JSON.stringify(user));
    this.isLoggedInSubject.next(true); // Emit the login status change
    this._router.navigateByUrl("menu").then(()=>{
      window.location.reload();
      window.scrollTo(0, 0);
  });
   
  }
  checkInitialLoginStatus(): boolean {
    return !!localStorage.getItem('currentUser');
  }
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false); // Emit the logout status change
    this._router.navigate(['/home']);
    window.scrollTo(0, 0);
  }

}
