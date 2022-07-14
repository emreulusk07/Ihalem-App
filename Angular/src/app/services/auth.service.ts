import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path = "http://localhost:5000/api/auth/";
  userToken:any;
  decodeToken:any;
  jwtHelper:JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";
  ID = 0;
  // post işlemi yapılacağı için HttpClient eklemesi yapıldı.
  constructor(private httpClient:HttpClient, private router:Router, private alertifyService: AlertifyService) { }

  login(loginUser:LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json");
    // loginUser icin kayıt yapılır. headers için headers gönderim şekli de bu şekildedir.
    // ve login olan kullanıcı için subscribe içindeki işlemler gerçekleştirilir.
    this.httpClient.post<any>(this.path + "login", loginUser, {headers:headers}).subscribe(data => {
      loginUser.id = data.id;
      console.log("ddgfdfd");
      console.log('asdsad', loginUser.id, loginUser.mail);
      this.saveToken(data.token);
      this.saveUserId(loginUser.id);
      this.userToken = data.token;
      this.decodeToken = this.jwtHelper.decodeToken(data.token.toString());
      this.alertifyService.success("Sisteme giriş gerçekleşti.");
      this.router.navigateByUrl('/bid');
    }, err=> console.log(err));
  }

  // localStorage'a token kayıt işlemi
  saveToken(token:any) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  saveUserId(id:any) {
    console.log('SUIdata: ', id);
    localStorage.setItem("loginUserId", id);
    this.ID = id;
  }

  register(registerUser:RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json");
    this.httpClient.post(this.path + "register", registerUser, {headers:headers}).subscribe(data => {
      this.alertifyService.success("Kullanıcı kaydı gerçekleşti.");
      this.router.navigateByUrl('/bid');
    })
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem("loginUserId");
    this.alertifyService.error("Sistemden çıkış gerçekleşti.");
  }

  // kullanıcı sistemde login durumda mı
  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  get loginUserId() {
    console.log('LUIdata: ', localStorage.getItem("loginUserId"));
    return localStorage.getItem("loginUserId");
  }
  getLoginUserId() {
    return this.jwtHelper.decodeToken("loginUserId");
  }

  // mevcut kullanıcı
  getCurrenUserId() {
    return this.jwtHelper.decodeToken(this.TOKEN_KEY);
  }
}
