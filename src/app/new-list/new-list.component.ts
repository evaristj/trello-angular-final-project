import { Component } from '@angular/core';
import { DataManagerService } from '../data-manager.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent {

  constructor(private dataService: DataManagerService,
    private api: ApiService,
    private router: Router) { }

  addList(ev) {
    console.log(ev, 'addList init');
    if (ev.target.value.trim() !== '') {
      this.dataService.addNewList(ev.target.value);
    ev.target.value = '';
    }
    console.log(ev, 'addList fin');
  }
  logout() {
    console.log('logout init');
    this.api.logoutSession();
    console.log(this.api.jwt, 'token de sesión borrado.');
    this.router.navigate(['/login']);
  }

}
