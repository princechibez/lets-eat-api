import { Schema, model } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: [String], required: true },
    directions: { type: [String], required: true },
    category: { type: String, required: true },
    diet: { type: String, required: true }, // Balanced, High protein, Low fat
    cuisineType: { type: String, required: true }, // American, Chinese
    health: { type: String, required: true }, // Gluten free,  Low sugar, No oil added
    readyIn: { type: String, required: true },
    mealType: { type: String, required: true }, // Breakfast, Brunch
    dishType: { type: String, required: true }, // Pastry, Pasta, side dish
    rating: { type: Number, required: true },
    numOfRating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const RecipeModel = model('Recipe', recipeSchema);

export default RecipeModel;
