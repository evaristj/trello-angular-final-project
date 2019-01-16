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
        name: 'TO DO',
        tasks: [
          {
            listId: 1,
            listTask: 1,
            text: 'aprender angular',
            completed: false,
            color: 'red',
            createdAt: new Date(),
            modifiedAt: new Date()
          }
        ]
      },
      {
        listId: 2,
        createdAt: new Date(),
        modifiedAt: new Date(),
        name: 'DOING',
        tasks: [
          {
            listId: 2,
            listTask: 2,
            text: 'angular trabajando',
            completed: false,
            color: 'red',
            createdAt: new Date(),
            modifiedAt: new Date()
          }
        ]
      },
      {
        listId: 3,
        createdAt: new Date(),
        modifiedAt: new Date(),
        name: 'WAITING',
        tasks: [
          {
            listId: 3,
            listTask: 3,
            text: 'angular esperando',
            completed: false,
            color: 'red',
            createdAt: new Date(),
            modifiedAt: new Date()
          }
        ]
      },
      {
        listId: 4,
        createdAt: new Date(),
        modifiedAt: new Date(),
        name: 'DO IT',
        tasks: [
          {
            listId: 4,
            listTask: 1,
            text: 'angular hecho',
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
