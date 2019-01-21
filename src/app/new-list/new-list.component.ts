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
    if (ev.target.value.trim() !== '') {
      this.dataService.addNewList(ev.target.value);
    ev.target.value = '';
    }
  }
  logout() {
    console.log('logout init');
    this.api.logoutSession();
    console.log('logout fin');
    console.log(this.api.jwt);
    this.router.navigate(['/login']);
  }

}
