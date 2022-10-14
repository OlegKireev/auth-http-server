import { signUp } from "./sign-up";
import { login} from "./login";
import { getUsers } from "./get-users";

class AuthController {
  signUp = signUp
  login = login
  getUsers =  getUsers
}

export const authController = new AuthController();