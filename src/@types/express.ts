import { Request } from "express";

interface IUser {
  _id: string;
}

export interface IAuthRequest extends Request {
  user?: IUser;
}
