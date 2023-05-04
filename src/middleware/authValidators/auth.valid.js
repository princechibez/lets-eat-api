const bcrypt = require("bcrypt");
const { body } = require("express-validator");

const User = require("../../models/user.model");

const LoginValidatorHandler = () => {
  let user;
  return [
    body("email", "Invalid email provided")
      .isEmail()
      .custom(async (value) => {
        const existingEmail = await User.findOne({ email: value });
        user = existingEmail;
        if (!existingEmail) {
          throw new Error("Email address not found");
        }
        return true;
      }),
    body("password").custom(async (value, { req }) => {
      const passwordMatch = await bcrypt.compare(value, user.password);
      if (!passwordMatch) {
        throw Error("Incorrect email or Passoword");
      }
      return true;
    }),
  ];
};

const SignupValidatorHandler = () => {
  let user;
  return [
    body("email", "Invalid email address")
      .isEmail()
      .custom(async (value, { req }) => {
        const existingEmail = await User.findOne({ email: value });
        user = existingEmail;
        if (existingEmail) {
          throw new Error("This email already exists, use another one.");
        }
        return true;
      }),
    // body("username")
    //   .not()
    //   .isEmpty()
    //   .custom(async (value, { req }) => {
    //     const existingUsername = await User.findOne({ username: value });
    //     if (existingUsername) {
    //       throw new Error("This username has already been taken");
    //     }
    //     return true;
    //   }),
    // body("phone", "Invalid phone number").isMobilePhone(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be upto eight characters"),
  ];
};

module.exports = {
  LoginValidator: LoginValidatorHandler(),
  SignupValidator: SignupValidatorHandler()
};
