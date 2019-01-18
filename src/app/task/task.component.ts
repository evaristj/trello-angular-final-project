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
  editing = false;
  constructor(private dataService: DataManagerService) { }

  editTaskDescription() {
    this.task.description = this.newDescription;
    this.dataService.updateTask(this.task);
    this.editing = false;
  }
  editDescription() {
    this.editing = true;
  }
  cancelEditDescription() {
    this.editing = false;
  }

  deleteTask() {
    this.dataService.deleteTask(this.task.listTaskId, this.task.taskId);
  }

}
