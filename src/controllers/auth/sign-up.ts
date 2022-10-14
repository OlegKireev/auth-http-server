import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { UserModel } from "../../models/User.model";
import { hash } from 'bcryptjs';
import { RoleModel } from "../../models/Role.model";

interface ISignUpRequestBody {
  username: string;
  password: string;
}

interface ISignUpResponseBody {
  message: string;
  errors?: any;
}

const PASSWORD_SALT = 7;

export const signUp = async (
  req: Request<any, any, ISignUpRequestBody>,
  res: Response<ISignUpResponseBody>
) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res
        .status(400)
        .json({message: 'Validation error', errors: validationErrors})
    }

    const { username, password } = req.body;
    const alreadyRegistredUser = await UserModel.findOne({ username });

    if (alreadyRegistredUser) {
      return res
        .status(400)
        .json({ message: `User with username: ${username} has already registred`});
    }

    const hashedPassword = await hash(password, PASSWORD_SALT);

    const newUserRole = await RoleModel.findOne({value: 'USER'});
    console.log(newUserRole);

    const newUser = new UserModel({ 
      username,
      password: hashedPassword,
      roles: [
        newUserRole?.value
      ],
    });
    await newUser.save();

    return res.status(201).json({ message: 'Success registration'});

  } catch (err) {
    console.warn(err);
    res.status(400).json({ message: 'Registartion error'});
  }
}