import { Component, OnInit, Input } from '@angular/core';
import { List } from '../models.interface';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list: List;
  constructor(private dataService: DataManagerService) { }

  delete(id) {
    if (confirm('¿Quieres borrar la lista?' + this.list.name)) {
      this.dataService.deleteList(id);
    }

  }

}
