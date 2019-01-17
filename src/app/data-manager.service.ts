import { Injectable } from '@angular/core';
import { List, Task } from './models.interface';


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
            taskId: 0,
            listTaskId: 1,
            text: 'aprender angular',
            completed: false,
            color: 'red',
            createdAt: new Date(),
            modifiedAt: new Date()
          },
          {
            taskId: 1,
            listTaskId: 1,
            text: 'aprender angular 2',
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
            taskId: 0,
            listTaskId: 2,
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
            taskId: 0,
            listTaskId: 3,
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
            taskId: 0,
            listTaskId: 4,
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
  addNewList(name: string) {
    const id = new Date();
    const newList: List = {
      listId: Date.now(),
      createdAt: id,
      modifiedAt: id,
      name,
      tasks: []
    };
    this.data.lists.push(newList);
  }

  deleteList(listId: number) {
    this.data.lists = this.data.lists.filter(list => list.listId !== listId);
  }

  addNewTask(text: string, list: List) {
    const now = new Date();
    const newTask: Task = {
      listTaskId: list.listId,
      taskId:  Date.now(),
      text,
      completed: false,
      color: 'white',
      createdAt: now,
      modifiedAt: now,
    };
    this.data.lists = this.data.lists.map(listObj => {
      if (listObj.listId === list.listId) {
        listObj.tasks.push(newTask);
      }
      return listObj;
    });
  }
  deleteTask(listId: number, taskId: number) {
    this.data.lists = this.data.lists.map(list => {
      if (list.listId === listId) {
        list.tasks = list.tasks.filter(task => task.taskId !== taskId);
      }
      return list;
    });
    // console.log(this.data2[0]);
  }
/*   deleteTask(taskId: number, listId: number) {
    this.data.lists = this.data.lists.map(listObj => {
      if (list.listId === listId) {
        list.tasks = list.tasks.filter(task => { task.taskId !== taskId });

      }
      return list;
    });

  } */
  constructor() { }
}
