const express = require('express');


const RecipeController = require("../controllers/recipes.controls");

const recipeRouter = express.Router()


recipeRouter.get('/getAllRecipes', RecipeController.getAllRecipes)

module.exports = recipeRouter