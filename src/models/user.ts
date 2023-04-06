import { model, Schema } from "mongoose";
import { IUser } from "../@types";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      default: null,
      select: false,
    },
    password: {
      type: String,
      default: null,
      select: false,
    },
    polls: {
      type: [Schema.Types.ObjectId],
      ref: "polls",
      default: null,
    },
  },
  { timestamps: true }
);

export const userModel = model<IUser>("users", userSchema, "users");
