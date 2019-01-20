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
  constructor(private api: ApiService) { }

  register() {
    this.api.register(this.username, this.password);
  }

}
