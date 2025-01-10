export interface IRawPhoto {
  url: string;
  transactionR_id: string;
}
export interface IPhoto extends IRawPhoto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
export type ArrayPhotoType = Array<IPhoto>;
