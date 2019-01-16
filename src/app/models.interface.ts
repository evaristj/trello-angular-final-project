
export interface List {
    listId: number;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    tasks: Array<Task>;
}

export interface Task {
    listId: number;
    listTask: number;
    text: string;
    completed: false;
    color: string;
    createdAt: Date;
    modifiedAt: Date;
}
