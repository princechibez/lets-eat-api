const Recipes = require('../models/recipe.model');

const getRecipes = async (filter) => {
  try {
    return await Recipes.find(filter).select('_id title image rate readyInMinutes cuisineType').lean();
    // .populate({ path: "reviews", select: "rate" })
  } catch (error) {
    throw { status: 400, message: error.message || "Couldn't fetch data" };
  }
};

const getRecipeById = async (id) => {
  try {
    return await Recipes.findById(id);
  } catch (error) {
    throw { status: 400, message: error.message || "Couldn't fetch data" };
  }
};

module.exports = { getRecipes, getRecipeById };
