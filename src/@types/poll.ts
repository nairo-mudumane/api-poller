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

export type INewPollOption = Partial<Omit<IPollOption, "vote">>;

export interface INewPoll {
  title?: string;
  multi?: boolean;
  options?: INewPollOption[];
}
