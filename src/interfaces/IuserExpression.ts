export type IuserExpression = {
  _id: string;
  expression: string;
  author: {
    name: string;
  };
  favorite: boolean;
};
