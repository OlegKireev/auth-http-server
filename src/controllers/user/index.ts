import { getUsers } from "./get-users";

class UserController {
  getUsers =  getUsers
}

export const userController = new UserController();