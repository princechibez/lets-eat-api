const axios = require("axios");
require("dotenv/config");

const Recipe = require("../models/recipe.model");

const { DATA_SOURCE } = process.env;

// const dataEntryPath = path.join(
//   path.dirname(process.mainModule.filename),
//   "../models",
//   "data.json"
// );

const transformData = (data) => {
  let ingredients = [];
  data.ingredients.forEach((ing) => {
    ingredients.push(ing.text);
  });
  const schemeFormat = {
    title: data.label,
    image: data.image,
    readyInMinutes: data.totalTime,
    ingredients: ingredients,
    diets: data.dietLabels,
    healthBenefits: data.healthLabels,
    cuisineType: data.cuisineType,
    dishType: data.dishType,
  };

  return schemeFormat;
};
class DB_Populator {
  async Transport_to_DB(req, res, next) {
    try {
      console.log("fetching recipes...");
      let processedData = [];
      const response = await axios.get(DATA_SOURCE);
      // return console.log(response.data.hits[0].recipe.image)
      response.data.hits.forEach((element) => {
        const recipe = element.recipe;
        const formattedData = transformData(recipe);
        processedData.push(formattedData);
      });

      processedData.forEach(async (recipe, i) => {
        try {
          const newRecipe = new Recipe({
            ...recipe,
          });
          await newRecipe.save();
        } catch (err) {
          throw err;
        }
      });

      res.status(200).json({ data: processedData });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new DB_Populator();
