import { model, Schema } from "mongoose";
import { IPoll } from "../@types/poll";

const pollSchema = new Schema<IPoll>(
  {
    multi: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    options: {
      label: {
        type: String,
        required: true,
      },
      key: {
        type: String,
        required: true,
      },
      vote: [String],
    },
  },
  { timestamps: true }
);

export const pollModel = model<IPoll>("polls", pollSchema, "polls");
