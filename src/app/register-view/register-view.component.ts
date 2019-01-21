import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent {
  username: string;
  password: string;
  error: any;
  valid: any;
  constructor(private api: ApiService) { }

  register() {
    console.log('inicio register component');
    const { username, password } = this;
    if (username.trim() !== '' && password.trim() !== '') {
      this.api
        .register(username.trim(), password.trim())
        .then(res => {
          console.log(res);
          this.valid = res;
        })
        .catch(error => {
          console.log(error);
          this.error = error;
        });
    }
    console.log('fin register component');
  }

}
