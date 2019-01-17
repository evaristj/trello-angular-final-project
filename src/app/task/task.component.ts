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
  constructor(private dataService: DataManagerService) { }

  deleteTask() {
    this.dataService.deleteTask(this.task.listTaskId, this.task.taskId);
  }

  ngOnInit() {
  }

}
