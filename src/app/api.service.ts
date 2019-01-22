import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from './models.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  jwt: string = localStorage.getItem('jwt');
  urlRegister = 'https://apitrello.herokuapp.com/users';
  urlLogin = `https://apitrello.herokuapp.com/users/login`;
  urlList = 'https://apitrello.herokuapp.com/list/';
  urlListTasks = 'https://apitrello.herokuapp.com/list/tasks/';
  urlTasks = 'https://apitrello.herokuapp.com/tasks';
  urlPutTasks = 'https://apitrello.herokuapp.com/tasks/';
  options = { headers: { Authorization: `Bearer ${this.jwt}` } };

  constructor(private http: HttpClient) { }

  register(username, password) {
    return this.http.post(this.urlRegister, { username, password }).toPromise();
  }

  login(username, password) {
    console.log('inicio login api');
    const body = { username, password };
    return new Promise((resolve, reject) => {
      this.http.post(this.urlLogin, body)
        .toPromise().then(() => {
          reject('User not found');
        }).catch(maybeNotAndError => {
          if (maybeNotAndError.status === 200) {
            console.log('status.error.200');
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
  logoutSession() {
    console.log('logoutSession init');
    localStorage.clear();
    console.log('logoutSession fin');
  }
  getLists(): any {
    return this.http.get(this.urlList, this.options).toPromise();
  }
  getTasks(idlist: number): any {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.urlListTasks + idlist, this.options)
        .toPromise()
        .then(tasks => {
          if (tasks) {
            resolve(tasks);
          } else {
            resolve([]);
          }
        })
        .catch(error => {
          console.log(error);
          resolve([]);
        });
    });
  }
  newList(name: string): any {
    const body = { name };
    return this.http.post(this.urlList, body, this.options).toPromise();
  }
  updateList(name: string, listId: number): any {
    const body = { name };
    console.log(name, 'updateList API');
    return this.http.put(this.urlList + listId, body, this.options).toPromise();
  }
  deleteList(id: number): any {
    return this.http.delete(this.urlList + id, this.options).toPromise();
  }
  newTask(task: string, idlist: number): any {
    console.log(task, idlist, 'inicio newTask API');
    const body = { task, idlist };
    console.log(task, idlist, 'fin newTask API');
    return this.http.post(this.urlTasks, body, this.options).toPromise();
  }
  updateTask(task: string, idTask: number) {
    const body = { task };
    return this.http.put(this.urlPutTasks + idTask, body, this.options).toPromise();
  }
  deleteTask(listId: number): any {
    return this.http.delete(this.urlListTasks + listId, this.options).toPromise();
  }
}
