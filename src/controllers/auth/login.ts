import { Request, Response } from "express";
import { UserModel } from "../../models/User.model";
import { compareSync } from 'bcryptjs';
import { generateAuthToken } from "../../lib/authToken";
import { Role } from "../../types/roles";

interface ILoginRequestBody {
  username: string;
  password: string;
}

interface ILoginResponseBody {
  message: string;
  token?: string; 
  errors?: any;
}

export const login = async (
  req: Request<any, any, ILoginRequestBody>,
  res: Response<ILoginResponseBody>
) => {
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

      const userRoles = findedUser.roles as Role[];

      console.log(findedUser);

      const token = generateAuthToken(String(findedUser._id), userRoles);

      return res
        .status(200)
        .json({message: 'Success login', token: token});

    } catch (err) {
      console.warn(err);
      res.status(400).json({ message: 'Login error'});
    }
}