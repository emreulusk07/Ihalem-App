import { Component, Input, OnInit } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
@Input() titleData: string = "";

loginUser:LoginUser;

title: string = "";
  constructor(private authService:AuthService) { 
    this.loginUser = {
      mail: "",
      password: ""
    } as LoginUser;
  }

  // loginUser formdan gelen değerlerle doldurulur.
  

  ngOnInit(): void {
    this.title = this.titleData;
  }
/*
  login() {
    this.authService.login(this.loginUser);
  }
*/
  logOut() {
    this.authService.logOut();
  }

  public get isAuthenticated() {
    return this.authService.loggedIn();
  }
}
