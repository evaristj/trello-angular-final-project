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

  addNewList(name: string) {
    this.api.newList(name).then(res => {
      console.log(res);
      this.loadDataFromBackend();
    });
  }

  deleteListId(listId: number) {
    this.api.deleteList(listId).then(resolve => {
      console.log(resolve);
      this.loadDataFromBackend();
    });
  }

  addNewTask(text: string, list: List) {
    this.api.newTask(text, list.listId).then(resolve => {
      console.log(resolve, 'inicio newTask data-manager');
      this.loadDataFromBackend();
      console.log('tarea añadida dataManager');
    });
  }

  deleteTask(listId: number) {
    this.api.deleteTask(listId).then(resolve => {
      console.log(resolve, 'inicio delete dataManager');
    }).catch(() => this.loadDataFromBackend());
  }

  updateListService(list: List) {
    this.api.updateList(list.name, list.listId).then(resolve => {
      console.log(resolve);
      this.loadDataFromBackend();
    }).catch(() => console.log('update list error dataManager'));
  }

  // este método recibe el objeto task por parámetro y lo devuelve, por lo que se puede reutilizar
  // para actualizar el objeto Task en local
  updateTask(objTask: Task) {
    console.log('updatetarea init localStorage, dataManager.');
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
  putTask(task: Task) {
    this.api.updateTask(task.text, task.taskId).then(resolve => {
      this.loadDataFromBackend();
    }).catch(() => {
      console.log('error in putTask dataManager.');
    });
  }
}
