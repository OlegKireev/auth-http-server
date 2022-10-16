import { Router } from 'express';
import { 
  authController,
} from '../controllers';
import { check } from 'express-validator';
import { hasWhitespaceChars } from '../lib/validators';

export const authRouter = Router(); 

authRouter.post('/signup', 
  check('username').trim().escape(),
  check('username', 'You must fill the username field')
    .notEmpty({ignore_whitespace: true}),
  check('username', 'Username musn\'t has whitespaces')
    .custom(hasWhitespaceChars),
  check('username', 'Username must contains minmum 3 symbols')
    .isLength({min: 3}),

  check('password').trim().escape(),
  check('password', 'Password musn\'t has whitespaces')
    .custom(hasWhitespaceChars),
  check('password', 'Password must contains minmum 6 to 10 symbols')
    .isLength({min: 6, max: 10}),
  authController.signUp,
);

authRouter.post('/login', authController.login);