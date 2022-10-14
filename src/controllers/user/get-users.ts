import { Request, Response } from "express";
import { UserModel } from "../../models/User.model";

export const getUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({
      data: users
    })
  } catch (err) {
    console.warn(err);
  }
}