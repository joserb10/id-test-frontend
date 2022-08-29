import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private url:string = 'http://127.0.0.1:8000/api/group/';
  private headers: any;
  private token: string = localStorage.getItem('token');
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+this.token);
  }

  getGroups() {
    return this.http.get(this.url + 'getAll', {headers:this.headers});
  }

}
