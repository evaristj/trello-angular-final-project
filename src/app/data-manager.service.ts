import { Injectable } from '@angular/core';
import { List } from './models.interface';


@Injectable({
  providedIn: 'root'
})

export class DataManagerService {
  data: { lists: Array<List> } = {
    lists: [
      {
        listId: 1,
        createdAt: new Date(),
        modifiedAt: new Date(),
        name: 'TODO',
        tasks: [
          {
            listId: '2',
            listTask: '0',
            text: 'angular',
            completed: false,
            color: 'red',
            createdAt: new Date(),
            modifiedAt: new Date()
          }
        ]
      }
    ]
  };

  getData() {
    return this.data;
  }
  constructor() { }
}
