const express = require('express');

const { SignupValidator, LoginValidator } = require('../middleware/authValidators/auth.valid');
const AuthContoller = require("../controllers/auth.controller");

const authRouter = express.Router()

// const signupValidator = new AuthValidators("signup")

authRouter
    .post("/signup", SignupValidator, AuthContoller.signup)
    .post("/login", LoginValidator, AuthContoller.login)

module.exports = authRouter