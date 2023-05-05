const { model, Schema } = require("mongoose");
const { SCHEMAS } = require("../utilities/constants");

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  unit: { type: String, default: "teaspoons" }, // cups, teaspoons,
});

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    healthScore: { type: Number, default: 0 },
    readyInMinutes: { type: Number, default: 0 },
    servings: { type: Number, default: 1 },
    summary: { type: String, required: true },
    dishTypes: { type: [String], required: true }, //desert, dinner, lunchh
    ingredients: [ingredientSchema],
    instructions: { type: [String], required: true },
    diets: { type: [String], required: true },
    occasions: { type: [String], required: true },
    cuisineType: { type: [String], required: true },
    dishType: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = model(SCHEMAS.RECIPE_SCHEMA, recipeSchema);
