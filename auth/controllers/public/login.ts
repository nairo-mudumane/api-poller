import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, IUserLogin } from "../../@types";
import { checkLoginFields } from "../utils";
import { userModel } from "../../models";

export async function login(request: Request, response: Response) {
  const { email, password } = request.body as IUserLogin;
  let user: IUser | null = null;

  try {
    checkLoginFields({ email, password });

    user = await userModel
      .findOne({ email })
      .select("+password")
      .then((data) => (data as any)._doc);
    if (!user) throw new Error("email or password invalid");
    else if (user.googleId) user = user;
    else if (!(await bcrypt.compare(password!, user.password!)))
      throw new Error("email or password invalid");

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_JWT_HASH!, {
      expiresIn: "8h",
    });

    return response
      .status(200)
      .json({ message: "ok", data: { ...user, password: undefined, token } });
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }
}
