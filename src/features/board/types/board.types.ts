export type TagVariant =
  | 'feature'
  | 'review'
  | 'teste'
  | 'design'
  | 'devops'
  | 'refactor'
  | 'docs'
  | 'default';

export interface BoardCardData {
  id: string;
  title: string;
  tag?: TagVariant;
}

export type ColumnId = 'todo' | 'inprogress' | 'done';

export interface BoardColumnData {
  id: ColumnId;
  title: string;
  accentColor: string;
  badgeColor: string;
  cards: BoardCardData[];
}

export interface BoardState {
  columns: BoardColumnData[];
}
