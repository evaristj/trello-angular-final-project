import { Component, Input } from '@angular/core';
import { List } from '../models.interface';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list: List;
  editing = false;
  newName = '';

  constructor(private dataService: DataManagerService) { }

  deleteList(id) {
    if (confirm('¿Quieres borrar la lista?' + this.list.name)) {
      this.dataService.deleteListId(id);
    }
  }
  newTask(ev) {
    // crear if para que no añada listas vacias y despues vaciar el input
    const text = ev.target.value.trim();

    if (text !== '') {
      this.dataService.addNewTask(text, this.list);
      ev.target.value = '';
    }
  }
  editListName() {
    // al ejecutar intro aunque pierda el foco con blur, se acutaliza con el nombre pulsado
    this.list.name = this.newName;
    this.dataService.editListNameService(this.list);
    this.editing = false;
  }
  editName(nodo) {
    setTimeout(() => {
      nodo.focus();
    }, 0);
    this.editing = true;
  }
  cancelEditName() {
    this.editing = false;
  }
}
