import { IUser } from './iuser';

export class User implements IUser {
  constructor(public id:number, public firstname:string, public surname:string, public email:string) { }
}
