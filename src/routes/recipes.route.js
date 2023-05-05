const express = require('express');

const RecipeController = require("../controllers/recipes.controls");

const recipeRouter = express.Router()

recipeRouter.get('/', RecipeController.getAllRecipes)

recipeRouter.get('/:id', RecipeController.getSingleRecipe)

module.exports = recipeRouter