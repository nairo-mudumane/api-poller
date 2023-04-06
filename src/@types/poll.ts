import { IMongoData } from "./mongo";

export type IPollState = "open" | "closed";

export interface IPollOptionVote {
  total: number;
  ips: string[];
}

export interface IPollOption {
  label: string;
  key: string;
  vote: IPollOptionVote; // or ip's string[] ??
}

export interface IPoll extends IMongoData {
  createdBy: string;
  state: IPollState;
  title: string;
  options: IPollOption[];
}
