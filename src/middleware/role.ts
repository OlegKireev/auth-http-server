import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { Role } from "../types/roles";

export const roleMiddlewareCreator = (permitedRoles: Role[]) => (
  req: Request,
  res: Response,
  next: NextFunction,
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
    const decodedData = <{roles: Role[]}>verify(token, secretKey);
   
    const roles: Role[] = decodedData.roles; 
    const hasPermission = roles
      .some((role) => permitedRoles.includes(role));

    if (!hasPermission) {
      return res.status(401).json({ message: "User doesn't have a permission"})
    }

    next();
   } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "User isn't authorized"})
  }
}