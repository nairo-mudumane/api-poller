import { Request, Response } from "express";
import { INewUser } from "../../@types";
import { userModel } from "../../models";
import { checkSignupFields } from "./utils";

export async function Signup(request: Request, response: Response) {
  const payload = request.body as INewUser;

  try {
    checkSignupFields(payload);

    const exists = await userModel.findOne({ email: payload.email });
    if (exists) throw new Error(`user: ${payload.email} already exists`);
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    const created = await userModel.create(payload);
    return response
      .status(201)
      .json({ message: "created", data: { _id: created._id } });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
