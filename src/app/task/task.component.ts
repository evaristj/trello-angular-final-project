import { Component, Input } from '@angular/core';
import { Task } from '../models.interface';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task;
  newDescription = '';
  newName = '';
  editDesBool = false;
  editNameBool = false;
  constructor(private dataService: DataManagerService) { }

  editTaskDescription() {
    this.task.description = this.newDescription;
    this.dataService.updateTask(this.task);
    this.editDesBool = false;
  }
  editDescription() {
    this.editDesBool = true;
  }
  cancelEditDescription() {
    this.editDesBool = false;
  }

  deleteTask() {
    if (confirm('Si pulsas acceptar se borrarán TODAS las tareas,')) {
      this.dataService.deleteTask(this.task.listTaskId);
    }
  }

/* editTaskName() {
    this.task.text = this.newName;
    this.dataService.updateTask(this.task);
    this.editNameBool = false;
  } */
  editName() {
    this.editNameBool = true;
  }
  cancelNameTask() {
    this.editNameBool = false;
  }
  updateTaskApi() {
    this.task.text = this.newName;
    this.dataService.putTask(this.task);
  }
/*   updateTaskColor(chooseColor: string) {
    this.task.color = chooseColor;
    this.dataService.updateTask(this.task);
    console.log(this.task.color, chooseColor);
  } */
}
