const Recipes = require("../models/recipe.model");

class Recipe_Controller {
  // get all recipes
  async getAllRecipes(req, res, next) {
    try {
      const recipes = await Recipes.find()
        // .populate({ path: "reviews", select: "rate" })
        .lean();

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
}

module.exports = new Recipe_Controller();
