const express = require("express");
const { param } = require("express-validator");

const RecipeController = require("../controllers/recipes.controls");
const authChecker = require("../middleware/authenticator");

const recipeRouter = express.Router();

recipeRouter.get('/getAllSavedRecipe', authChecker, RecipeController.getSavedRecipes)

recipeRouter.get("/:id", RecipeController.getSingleRecipe);

recipeRouter.post(
  "/save-recipe/:recipeId",
  authChecker,
  [
    param("recipeId")
      .not()
      .isEmpty()
      .withMessage("parameter[recipeId] needed for this API..."),
  ],
  RecipeController.saveRecipe
);

recipeRouter.get("/", RecipeController.getAllRecipes);

module.exports = recipeRouter;
