export interface Tag {
  id: string;
  label: string;
  variant: 'red' | 'yellow' | 'green' | 'blue';
}

export interface Member {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export interface Subtasks {
  completed: number;
  total: number;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subtasks: Subtasks;
  tags: Tag[];
  assignees: string[];
  attachmentCount: number;
  commentCount: number;
  columnId: string;
}

export interface Column {
  id: string;
  name: string;
  cards: Card[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
  members: Member[];
}

export type FilterTab = 'todos' | 'pendentes' | 'concluidas';
