import { IMongoData } from "../../shared/@types";

export interface IUser extends IMongoData {
  name: string;
  email: string;
  password: string | null;
  googleId: string | null;
  token?: string;
  resetPasswordToken: string | null;
  restPasswordTokenExpiresIn: Date | null;
}

type excludedFields =
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "googleId"
  | "polls"
  | "token";

export type INewUser = Omit<Partial<IUser>, excludedFields>;

export type IUserLogin = Partial<{ email: string; password: string }>;

export interface INewGoogleUser extends Omit<INewUser, "password"> {
  googleId?: string;
}
