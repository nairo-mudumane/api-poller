import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAuthRequest } from "../@types";
import { userModel } from "../models";

export function useAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader)
    return response
      .status(401)
      .json({ message: "unauthorized: no token provided" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2)
    return response
      .status(401)
      .json({ message: "unauthorized: invalid token structure" });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme))
    return response
      .status(401)
      .json({ message: "unauthorized: invalid token structure" });

  if (token === "undefined" || token === null || !token)
    return response
      .status(401)
      .json({ message: "unauthorized: invalid token structure" });

  return jwt.verify(
    token,
    process.env.SECRET_JWT_HASH!,
    async (err, decoded) => {
      if (err)
        return response
          .status(498)
          .json({ message: (err as jwt.VerifyErrors).message });

      const user = await userModel.findById((decoded as jwt.JwtPayload)._id);

      if (!user)
        return response
          .status(498)
          .json({ message: "unauthorized: unknown user" });
      else {
        (request as IAuthRequest)["user"] = { _id: String(user._id) };

        return next();
      }
    }
  );
}
