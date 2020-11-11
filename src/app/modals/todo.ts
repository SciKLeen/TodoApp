export interface IList {
  id: number;
  name: string;
  items: number;
}

export interface ITask {
  id: number;
  list_id: number;
  name: string;
  completed: boolean;
  createdAt: string;
  completedAt: string;
}
