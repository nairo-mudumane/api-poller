import { Response } from "express";
import { IAuthRequest, INewPoll } from "../../@types";

export async function create(request: IAuthRequest, response: Response) {
  const user = request.user;
  const payload = request.body as INewPoll;

  try {
    return response.json({ user, payload });
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }
}
