export interface IApiResponseSuccess <T> {
  statusCode:number,
  message:string,
  data:T,
  error:null,
}
export interface IApiResponseReject {
  statusCode:number,
  message:string,
  data:null,
  error:string
}
