const { getRecipes, getRecipeById } = require('../services/recipe.services');

class Recipe_Controller {
  // get all recipes
  async getAllRecipes(req, res, next) {
    const search = req.query.search || '';

    try {
      const recipes = await getRecipes({ 
        title: { $regex: search, $options: 'i' } 
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
}

module.exports = new Recipe_Controller();
