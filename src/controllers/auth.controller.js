const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const User = require("../models/user.model");
const mail_transporter = require("../utilities/automatedMailConfig");
const avatarGenerator = require("../utilities/generateAvatar");

const SALT_ROUNDS = process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;

class Auth_Controller {
  async signup(req, res, next) {
    const { password, email } = req.body;

    try {
      // check for errors thrown from validators
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = new Error(errors.array()[0].msg);
        error.statusCode = 400;
        throw error;
      }

      //   set username to the name on email address
      const username = email.split("@")[0];

      //   Generate avatar for user's profile picture
      const avatar = await avatarGenerator(email);

      //   hash user password before saving to DB.
      const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
      const hashedPassword = await bcrypt.hash(password, salt);

      // create a new user...
      const newUser = new User({
        username,
        password: hashedPassword,
        profilePicture: avatar,
        email,
      });
      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
        expiresIn: "24h",
      });

      // Send an email to the user
      mail_transporter().sendMail(
        {
          from: "lacocina@app.com",
          to: email,
          subject: "Welcome to La Cocina",
          text: `Hello ${username.toUpperCase()}, we are glad to have you here @La Cocina, 
                we hope you enjoy this application as you explore the wonderfull dishes all over the world`,
        },
        (err) => {
          if (err) {
            utilityMethods.errorGeneratorMethod(
              "Couldn't send email, try again..."
            );
          }
          console.log("message sent to email address");
        }
      );

      (await newUser.save()) &&
        res.status(200).json({
          message: "user created",
          data: newUser,
          token,
          success: true,
        });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    const { password, email } = req.body;

    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = new Error(errors.array()[0].msg);
        error.statusCode = 400;
        throw error;
      }

      const user = await User.findOne({ email: email }).select("-password");

      if (!user)
        return res
          .status(400)
          .json({ message: "User not found", success: false });

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        message: "Login Successfull",
        data: { user, token },
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new Auth_Controller();
