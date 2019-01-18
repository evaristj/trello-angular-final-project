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
            description: 'estoy aprendiendo karate a nivel dios.',
            completed: false,
            color: 'red',
            createdAt: new Date(),
            modifiedAt: new Date()
          },
          {
            taskId: 1,
            listTaskId: 1,
            text: 'aprender angular 2',
            // tslint:disable-next-line:max-line-length
            description: 'estoy aprendiendo karate a nivel dios. Por la gloria de mi madrrrre, lorem ipsum cagate en todo estaij sskkjs dllkkgds',
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
            description: 'estoy esperando una modificación.',
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
            description: 'acabo de terminar la tarea.',
            completed: false,
            color: 'red',
            createdAt: new Date(),
            modifiedAt: new Date()
          }
        ]
      }
    ]
  };

  constructor() { }

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
      taskId: Date.now(),
      text,
      description: 'Añade una descripción...',
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
  }

  editListNameService(list: List) {
    this.data.lists = this.data.lists.map(listObj => (listObj.listId === list.listId) ? list : listObj);
  }

  // este método recibe el objeto task por parámetro y lo devuelve, por lo que se puede reutilizar
  // para actualizar el objeto Task
  updateTask(objTask: Task) {
    this.data.lists = this.data.lists.map(list => {
      if (list.listId === objTask.listTaskId) {
        list.tasks = list.tasks.map(task => {
          if (task.taskId === objTask.taskId) {
            return objTask;
          }
          return task;
        });
        return list;
      }
    });
  }
}
