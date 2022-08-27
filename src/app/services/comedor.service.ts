import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComedorService {
  private url:string = 'http://127.0.0.1:8000/api/comedores/';
  private headers: any;
  private token: string = localStorage.getItem('token');
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+this.token);
  }

  crearComedor(comedor) {
    return this.http.post(this.url + 'crear', comedor, {headers:this.headers});
  }

  getComedores() {
    return this.http.get(this.url + 'getComedores', {headers:this.headers});
  }

  updateComedor(comedor) {
    return this.http.post(this.url + 'update', comedor, {headers:this.headers});
  }

  eliminarComedor(comedor) {
    return this.http.post(this.url + 'eliminar', comedor, {headers:this.headers});
  }

  searchComedores(texto) {
    let params = new HttpParams().set("texto", texto);
    return this.http.get(this.url + 'searchComedores', {headers:this.headers, params:params});
  }
}
