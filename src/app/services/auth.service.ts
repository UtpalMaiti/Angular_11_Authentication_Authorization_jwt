import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { map } from 'rxjs/operators';



@Injectable()
export class AuthService {
  constructor (private http: Http) {
  }

  login(credentials) {
    return this.http.post('/api/authenticate',
      JSON.stringify(credentials))
      .map(response => {
        const result = response.json();
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;

      });
  }

  logout() {
    localStorage.removeItem('token');

  }

  isLoggedIn(): boolean {
    return tokenNotExpired();

    // const jwthelper = new JwtHelper();
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   return false;
    // }

    // const expirationDate = jwthelper.getTokenExpirationDate(token);
    // const isTokenExpired = jwthelper.isTokenExpired(token);



    // return !isTokenExpired;
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    return new JwtHelper().decodeToken(token);

  }
}

