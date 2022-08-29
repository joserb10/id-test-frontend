import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url:string = 'http://127.0.0.1:8000/api/auth/';
  // private api_key = '';
  // public islogged: boolean = false;
  toggleSide: boolean = null;

  constructor( private http: HttpClient) { }

  login(usuario){
    return this.http.post(this.url + 'login', usuario);
  }
  register(usuario){
    return this.http.post(this.url + 'register', usuario);
  }

  setLocalStorage(response) {
    const expires = moment().add('1d');
    localStorage.setItem('token', response.token);
    localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('islogged', 'true');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    localStorage.removeItem('user');
    localStorage.removeItem('islogged');
  }


  getExpiration() {
    const expiration = localStorage.getItem('expires');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
