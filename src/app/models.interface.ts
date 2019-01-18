
export interface List {
    listId: number;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    tasks: Array<Task>;
}

export interface Task {
    listTaskId: number;
    taskId: number;
    text: string;
    description: string;
    completed: false;
    color: string;
    createdAt: Date;
    modifiedAt: Date;
}
