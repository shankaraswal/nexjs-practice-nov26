export interface TodoDocument {
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}
