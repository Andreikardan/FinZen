export interface IRawComment {
  text: string;
  transaction_id: number;
}
export interface IComment extends IRawComment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICommentText {
  text:string
}
export type ArrayCommentsType = Array<IComment>;
