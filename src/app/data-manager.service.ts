import { Injectable } from '@angular/core';
import { List, Task } from './models.interface';
import { ApiService } from './api.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class DataManagerService {
  data: { lists: Array<List> } = {
    lists: [/*
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
            description: 'estoy aprendiendo karate.',
            completed: false,
            color: 'red',
            createdAt: new Date(),
            modifiedAt: new Date()
          },
        ]
      },
      {
        listId: 2,
        createdAt: new Date(),
        modifiedAt: new Date(),
        name: 'WAITING',
        tasks: [
          {
            taskId: 0,
            listTaskId: 2,
            text: 'angular esperando',
            description: 'estoy esperando una modificación.',
            completed: false,
            color: 'red',
            createdAt: new Date(),
            modifiedAt: new Date()
          }
        ]
      } */
    ]
  };

  constructor(private api: ApiService, private router: Router) { }

  loadDataFromBackend() {
    this.api
      .getLists()
      .then((rawLists: Array<any>) => {
        console.log(rawLists);
        const lists = rawLists.map(rawList => ({
          listId: rawList.id,
          createdAt: rawList.createdAt,
          modifiedAt: rawList.updatedAt,
          name: rawList.name,
          tasks: [],
        }));
        Promise.all(
          lists.map(async (list: List) => {
            list.tasks = await this.api.getTasks(list.listId);
            list.tasks = list.tasks.map((rawTask: any) => ({
              listTaskId: rawTask.idlist,
              taskId: rawTask.id,
              text: rawTask.task,
              description: 'añade una descripción...',
              completed: false,
              color: 'white',
              createdAt: new Date(rawTask.createdAt),
              modifiedAt: new Date(rawTask.updatedAt),
            }));
            return list;
          }),
        // tslint:disable-next-line:no-shadowed-variable
        ).then(lists => {
          this.data.lists = lists;
        });
      })
      .catch(() => this.router.navigate(['/login']));
  }

  getData() {
    this.loadDataFromBackend();
    return this.data;
  }

  addNewList(nameMod: string) {
   /*  const id = new Date();
    const newList: List = {
      listId: Date.now(),
      createdAt: id,
      modifiedAt: id,
      name: nameMod,
      tasks: []
    };
    this.data.lists.push(newList); */

    this.api.newList(name).then(res => {
      console.log(res);
      this.loadDataFromBackend();
    });
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
    console.log('funcion añadir tarea init');
    this.data.lists = this.data.lists.map(listObj => {
      if (listObj.listId === list.listId) {
        listObj.tasks.push(newTask);
      }
      return listObj;
    });
    console.log('funcion añadir tarea fin');
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
    console.log('funcion update tarea init');
    this.data.lists = this.data.lists.map(list => {
      if (list.listId === objTask.listTaskId) {
        list.tasks = list.tasks.map(task => {
          if (task.taskId === objTask.taskId) {
            return objTask;
          }
          return task;
        });
      }
      return list;
    });
  }
}
