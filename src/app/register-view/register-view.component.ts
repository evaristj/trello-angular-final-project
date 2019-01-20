import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent {
  userName: string;
  password: string;
  constructor(private api: ApiService) { }

  register() {
    this.api.register(this.userName, this.password);
  }

}
