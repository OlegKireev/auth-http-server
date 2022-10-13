import { Request, Response } from "express";

class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      
    } catch (err) {
      console.warn(err);
    }
  }

  async login(req: Request, res: Response) {
      try {
        
      } catch (err) {
        console.warn(err);
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