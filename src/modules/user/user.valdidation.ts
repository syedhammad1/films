import { Joi } from "express-validation";

/**
 * Get All Validation
 */
const createUser = {
  body: Joi.object({
    username: Joi.string(),
    password: Joi.string(),
  }),
};

export default createUser;
