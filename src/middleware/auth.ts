import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: "User isn't authorized"})
    }
    const secretKey = process.env.SECRET_KEY;
    const decodedData = verify(token, secretKey);

    req.body.user = decodedData;
    next();
   } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "User isn't authorized"})
  }
};