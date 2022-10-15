import { signUp } from "./sign-up";
import { login} from "./login";

class AuthController {
  signUp = signUp
  login = login
}

export const authController = new AuthController();