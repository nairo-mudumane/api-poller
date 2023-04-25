import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { INewUser } from "../../@types";
import { checkSignupFields } from "../utils";
import { userModel } from "../../models";

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
    let data: INewUser = { ...payload };
    data["password"] = await bcrypt.hash(payload.password!, 10);

    const created = await userModel.create(data);
    return response
      .status(201)
      .json({ message: "created", data: { _id: created._id } });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
