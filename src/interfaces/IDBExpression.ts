export type IDBExpression = {
  _id: string;
  expression: string;
  author: string;
  deleted: boolean;
  favoriteOf: string | string[];
  created_at: string;
  updated_at: string;
};
