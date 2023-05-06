const express = require("express");
const { param } = require("express-validator");

const SubScription_Controller = require("../controllers/subscription");

const subscriptionRouter = express.Router();

subscriptionRouter.post(
  "/email-subscription/:userEmail",
  [
    param("userEmail")
      .isEmail()
      .withMessage("Invalid email address"),
  ],
  SubScription_Controller.email_Subscription
);

// subscriptionRouter.post("/userReview", RecipeController.getAllRecipes);

// subscriptionRouter.post("/like-recipe", RecipeController.getAllRecipes);

module.exports = subscriptionRouter;
