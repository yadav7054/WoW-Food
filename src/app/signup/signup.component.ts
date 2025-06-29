import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
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

  register() {
    if (this.signupForm.valid) {
      const { username, password } = this.signupForm.value;
      this.auth.register(username, password);
    } else {
      this.signupForm.markAllAsTouched(); // show all errors
    }
  }
}
