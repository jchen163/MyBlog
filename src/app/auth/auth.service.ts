import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  constructor(private _http : HttpClient, private _router : Router, private _cookieService : CookieService) { }

  authenticate(details) {
    this._http.post('http://localhost:2000/authenticate', details)
    .subscribe((data:any) => {
      if(data.loggedIn==true) {
        this._cookieService.set('loggedIn', data.loggedIn);
        this._cookieService.set('m_token', data.token);
        this._cookieService.set('user', data.logged_user);
        this._router.navigate(['/home']);
      } else {
        this._router.navigate(['/login']);
      }
    });
  }
  register(user){
    console.log(user);
    this._http.post('http://localhost:2000/register',user,
    { headers: new HttpHeaders().set('authorization', 'reg')})
    .subscribe((data:any) => {
      if(data.info==true)
      this._router.navigate(['/login']);
    });
  };
  
  checkLogin() {
    return this._cookieService.get('loggedIn');
  }

  cur_user() {
    return this._cookieService.get('user');
  }

  fetchToken() {
    // console.log(this._cookieService.get('m_token'));
    return this._cookieService.get('m_token');
  }
  logout(){
    this._cookieService.deleteAll();
  }
}
