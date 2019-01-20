import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  jwt: string = localStorage.getItem('jwt');

  constructor(private http: HttpClient) { }

  register(user, pass) {
    this.http.post('https://apitrello.herokuapp.com/users', { user, pass })
      .toPromise()
      .then(response => {
        console.log(response);
      }).catch(console.error);
  }

  login(user, pass) {
    console.log('inicio login api');
    const body = { user, pass };
    return new Promise((resolve, reject) => {
      this.http.post('https://apitrello.herokuapp.com/users/login', body)
        .toPromise().then(() => {
          reject('User not found');
        }).catch(maybeNotAndError => {
          if (maybeNotAndError.status === 200) {
            const jwt = maybeNotAndError.error.text;
            this.jwt = jwt;
            localStorage.setItem('jwt', jwt);
            resolve(200);
          } else if (maybeNotAndError.status === 401) {
            reject('Wrong password');
          } else {
            reject('Try again');
          }
          console.log('fin login api');
        });
    });
  }
}
