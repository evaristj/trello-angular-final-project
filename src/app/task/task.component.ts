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
    this.dataService.deleteTask(this.task.listTaskId, this.task.taskId);
  }

  editTaskName() {
    this.task.text = this.newName;
    this.dataService.updateTask(this.task);
    this.editNameBool = false;
  }
  editName() {
    this.editNameBool = true;
  }
  cancelNameTask() {
    this.editNameBool = false;
  }
}
