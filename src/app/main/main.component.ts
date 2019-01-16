import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service';
import { List } from '../models.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  data: {lists: Array<List> };
  constructor(private dataManager: DataManagerService) { }

  ngOnInit() {
    this.data = this.dataManager.getData();
  }

}
