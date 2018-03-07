import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private _authService : AuthService) { }

  intercept(req, next) {

    var authRequest = req.clone({
      headers:new HttpHeaders().set('authorization', this._authService.fetchToken())
    });

    return next.handle(req); // pass on the modified request object 
 //Most interceptors will transform the outgoing request before passing it to the next
 // interceptor in the chain, by calling next.handle(transformedReq)   
  }

}
