import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private url:string = 'http://127.0.0.1:8000/api/note/';
  private headers: any;
  private token: string = localStorage.getItem('token');
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+this.token);
  }

  getNotesByGroup(group) {
    return this.http.post(this.url + 'getByGroup', group, {headers:this.headers});
  }

  createNote(data) {
    return this.http.post(this.url + 'create', data, {headers:this.headers});
  }

  getNotesByDate(data) {
    return this.http.post(this.url + 'getByDate', data, {headers:this.headers});
  }

  getNotesWithImage(data) {
    return this.http.post(this.url + 'getWithImage', data, {headers:this.headers});
  }
}
