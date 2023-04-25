import { z as zod } from "zod";
import { INewUser, IUserLogin } from "../@types";

export function checkSignupFields(obj: INewUser): void {
  try {
    const schema = zod.object({
      name: zod
        .string({ required_error: "name is required" })
        .min(3, "The name must have at least 3 characters"),
      email: zod
        .string({ required_error: "email is required" })
        .email("invalid email"),
      password: zod
        .string({ required_error: "password is required" })
        .min(8, "password must contain at least 8 characters"),
    });

    schema.parse(obj);
  } catch (error) {
    if ((error as zod.ZodError).issues?.length > 0)
      throw new Error((error as zod.ZodError).issues[0].message);
    else throw new Error((error as Error).message);
  }
}

export function checkLoginFields(obj: IUserLogin): void {
  try {
    const schema = zod.object({
      email: zod
        .string({ required_error: "email is required" })
        .email("invalid email"),
      password: zod
        .string({ required_error: "password is required" })
        .min(8, "password must contain at least 8 characters"),
    });

    schema.parse(obj);
  } catch (error) {
    if ((error as zod.ZodError).issues?.length > 0)
      throw new Error((error as zod.ZodError).issues[0].message);
    else throw new Error((error as Error).message);
  }
}
