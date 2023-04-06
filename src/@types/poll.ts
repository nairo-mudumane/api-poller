import { IMongoData } from "./mongo";
import { IUser } from "./user";

export type IPollState = "open" | "closed";

export interface IPollOption {
  label: string;
  key: string;
  vote: string[];
}

export interface IPoll extends IMongoData {
  createdBy: string | IUser;
  state: IPollState;
  title: string;
  options: IPollOption[];
  multi: boolean;
}
