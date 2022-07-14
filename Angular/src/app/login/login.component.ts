import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../models/loginUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  loginUser:LoginUser;
  constructor(private authService:AuthService, private formBuilder:FormBuilder) {
    this.loginUser = {
      mail: "",
      password: ""
    } as LoginUser;
    this.loginForm = this.createLoginForm();
  }

  ngOnInit(): void {
  }

  createLoginForm() {
    return this.loginForm = this.formBuilder.group({
      mail: ["", Validators.required],
      password:  ["", [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    }
    )
  }

  login() {
    if(this.loginForm.valid) {
      this.loginUser = Object.assign({}, this.loginForm.value); // loginForm geçerliyse this.registerForm.value, {}'a yerleşir.
      this.authService.login(this.loginUser);
    }
    //this.authService.login(this.loginUser);
  }
/*
  logOut() {
    this.authService.logOut();
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }
*/
}
