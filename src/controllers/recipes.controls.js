const { validationResult } = require("express-validator");
const { getRecipes, getRecipeById } = require("../services/recipe.services");
const SaveRecipe = require("../models/savedRecipes");
const savedRecipes = require("../models/savedRecipes");

class Recipe_Controller {
  // get all recipes
  async getAllRecipes(req, res, next) {
    const search = req.query.search || "";

    try {
      const recipes = await getRecipes({
        title: { $regex: search, $options: "i" },
      });

      //   let recipeRateCount = 0;
      //   recipes.reviews.forEach((rate) => {
      //     recipeRateCount += rate;
      //   });
      //   const averageRate = recipeRateCount / recipes.reviews.length;

      let transformedRecipes = [];

      recipes.forEach((recipe) => {
        recipe = { ...recipe, rate: Math.floor(Math.random() * (5 - 1) + 1) };
        transformedRecipes.push(recipe);
      });

      res.status(200).json({ data: transformedRecipes, success: true });
    } catch (err) {
      next(err);
    }
  }

  async getSingleRecipe(req, res, next) {
    try {
      const recipe = await getRecipeById(req.params.id);

      res.status(200).json({ data: recipe, success: true });
    } catch (error) {
      next(error);
    }
  }

  // save recipe handler
  async saveRecipe(req, res, next) {
    try {
      // get recipe ID
      const recipeId = req.params.recipeId;

      // check for param errors
      let error = validationResult(req);
      if (!error.isEmpty()) {
        error = new Error(error.array()[0].msg);
        error.statusCode = 400;
        throw error;
      }

      // const isSaved = savedRecipes.findOne({$and: [{userId: req.userId}, {recipeId: recipeId}]})
      // if(isSaved) {
      //   let error = new Error("Recipe already saved");
      //   error.statusCode = 400;
      //   throw error;
      // }

      const saveRecipeWithId = new savedRecipes({
        recipeId: recipeId,
        userId: req.userId,
      });
      await saveRecipeWithId.save();
      res
        .status(200)
        .json({ message: "Recipe saved successfully", success: true });
    } catch (err) {
      next(err);
    }
  }

  // get all saved recipes
  async getSavedRecipes(req, res, next) {
    try {
      const userSavedRecipes = await savedRecipes
        .find({ userId: req.userId })
        .populate("recipeId")
        .lean();

      if (userSavedRecipes.length === 0) {
        return res
          .status(200)
          .json({ message: "No saved recipes", success: true });
      }

      res.status(200).json({ data: userSavedRecipes, success: true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new Recipe_Controller();
