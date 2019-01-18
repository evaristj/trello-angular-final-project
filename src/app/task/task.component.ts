import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models.interface';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  newDescription = '';
  editing = false;
  constructor(private dataService: DataManagerService) { }

/*
  editName(nodo) {
    setTimeout(() => {
      nodo.focus();
    }, 0);
  }
  cancelEditName() {
    this.list.name = this.oldName;
    this.editing = false;
  } */

  editTaskDescription() {
    this.task.description = this.newDescription;
    this.editing = false;
    this.dataService.editTaskDescription(this.task);
    this.editing = true;
  }
  editDescrition() {
    this.newDescription = this.task.description;
    this.editing = true;
  }
  cancelEditDescription() {
    this.editing = false;

  }

  deleteTask() {
    this.dataService.deleteTask(this.task.listTaskId, this.task.taskId);
    this.editing = false;
  }


  ngOnInit() {
  }

}
