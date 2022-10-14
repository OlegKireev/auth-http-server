import { Request, Response } from "express";
import { UserModel } from '../models/User.model';
import { RoleModel } from '../models/Role.model';
import { hash, compareSync } from 'bcryptjs';
import { validationResult } from 'express-validator';
import { generateAuthToken } from "../lib/authToken";

const PASSWORD_SALT = 7;

interface ISignUpRequestBody {
  username: string;
  password: string;
}

interface ISignUpResponseBody {
  message: string;
  errors?: any;
}

interface ILoginRequestBody {
  username: string;
  password: string;
}

interface ILoginResponseBody {
  message: string;
  token?: string; 
  errors?: any;
}

class AuthController {
  async signUp(
    req: Request<any, any, ISignUpRequestBody>,
    res: Response<ISignUpResponseBody>
  ) {
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

  async login(
    req: Request<any, any, ILoginRequestBody>,
    res: Response<ILoginResponseBody>
  ) {
      try {
        const { username, password } = req.body;
        const findedUser = await UserModel.findOne({ username });

        if (!findedUser) {
          return res
            .status(400)
            .json({message: `There are no users with username: ${username}`})
        }

        const isPasswordCorrect = compareSync(password, findedUser.password);
        
        if (!isPasswordCorrect) {
          return res
            .status(400)
            .json({message: 'Password is incorrect'});
        }

        const token = generateAuthToken(String(findedUser._id), findedUser.roles);

        return res
          .status(200)
          .json({message: 'Success login', token: token});

      } catch (err) {
        console.warn(err);
        res.status(400).json({ message: 'Login error'});
      }
  }

  async getUsers(req: Request, res: Response) {
      try {
        return res.json('server works')
      } catch (err) {
        console.warn(err);
      }
  }
}

export const authController = new AuthController();