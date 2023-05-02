import { Request, Response } from "express";
import crypto from "crypto";
import { IUser } from "../../@types";
import { userModel } from "../../models";

export async function forgotPassword(request: Request, response: Response) {
  const payload = request.body as { email?: string };
  let user: IUser | null = null;

  try {
    if (!payload.email) throw new Error("user not found");

    user = await userModel.findOne({ email: payload.email });
    if (!user) throw new Error("user not found");
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const restPasswordTokenExpiresIn = now;
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");

    await userModel.findOneAndUpdate(
      { email: payload.email },
      { restPasswordTokenExpiresIn, resetPasswordToken }
    );

    // todo: send email

    return response.status(200).json({ message: "ok" });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
