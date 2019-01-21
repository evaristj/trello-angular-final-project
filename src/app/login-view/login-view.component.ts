import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent {
  username: string;
  password: string;
  error: any;
  constructor( private api: ApiService, private router: Router) { }

  login() {
    console.log('inicio funcion login component');
    console.log('usuario:' + this.username + ', pass: ' + this.password);
    const { username, password} = this;
    this.api.login(username.trim(), password.trim())
    .then(() => {
      console.log('entra en then de login');
      this.error = undefined;
      // this.router.navigate(['/main']);
    }).catch(error => {
      console.log('entra en catch de login');
      this.router.navigate(['/main']);
      this.error = error;
    });
  }
}
