import { IMongoData } from "./mongo";
import { IPoll } from "./poll";

export interface IUser extends IMongoData {
  name: string;
  email: string;
  polls: IPoll[] | null;
  password: string | null;
  googleId: string | null;
}

export type INewUser = Omit<
  Partial<IUser>,
  "_id" | "createdAt" | "updatedAt" | "googleId" | "polls"
>;

export interface INewGoogleUser extends Omit<INewUser, "password"> {
  googleId?: string;
}
