export interface ISignInData {
  [key:string]:string
  email: string;
  password: string;
}

export interface ISignUpData extends ISignInData {
  username: string;
}

export type UserType = {
  id: number;
  email: string;
  img: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserWithoutTokenType ={
  user:UserType
}

export type UserWithTokenType = {
  user: UserType;
  accessToken: string;
};
