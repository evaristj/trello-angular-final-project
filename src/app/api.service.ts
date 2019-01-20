import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  register(user, pass) {
    this.http.post('https://apitrello.herokuapp.com/users', {user, pass}).toPromise().then(response => {
      console.log(response);
    }).catch(console.error);
  }

  login(user, pass) {
    const body = {user, pass};
    this.http.post('https://apitrello.herokuapp.com/users/login', body).toPromise().then(response => {
      console.log(response);
    }).catch(console.error);
  }
}
