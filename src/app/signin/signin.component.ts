import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient,private _router:Router,private _auth:AuthService) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/)
        ]
      ]
    });
  }

  signIn() {
    if (this.signinForm.valid) {
      const { username, password } = this.signinForm.value;

      this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.loginError = '';
          this._auth.login(user);
          alert("Login successful! 🍔");
        } else {
          this.loginError = 'Invalid username or password';
        }
      });
    } else {
      this.signinForm.markAllAsTouched();
    }
  }
}
