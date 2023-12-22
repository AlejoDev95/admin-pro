import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const validteJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  if (!token) {
    res.status(401).json({
      ok: false,
      message: "You are not authorized to make this request",
    });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET ?? "";
    const { uid } = jwt.verify(token, secretKey) as JwtPayload;
    req.uid = uid;
    next();
  } catch (error) {
    res.status(401).json({ ok: false, message: "Token invalid" });
  }
};
