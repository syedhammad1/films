import { Router } from "express";
import { UserController, UserAuthenticatorController } from "./user.controller";
import authenticate from "../../middlewares/authenticate";
import { validate } from "express-validation";
import userValidation from "./user.valdidation";

const router: Router = Router();
const userController: UserController = new UserController();
const UserAuthenticatorC: UserAuthenticatorController =
  new UserAuthenticatorController();

// POST /users/create
router.post(
  "/create",
  validate(userValidation),
  UserAuthenticatorC.registerUser.bind(UserAuthenticatorC)
);

// GET /users/:id
router.get(
  "/:id",
  authenticate.authenticateToken,
  userController.getUserById.bind(userController)
);

// POST /users/login
router.post(
  "/login",
  validate(userValidation),
  UserAuthenticatorC.loginUser.bind(UserAuthenticatorC)
);

export default router;
