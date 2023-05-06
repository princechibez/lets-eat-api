const { model, Schema } = require("mongoose");
const { SCHEMAS } = require("../utilities/constants");

const savedRecipeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    recipeId: { type: Schema.Types.ObjectId, ref: SCHEMAS.RECIPE_SCHEMA },
  },
  { timestamps: true }
);

module.exports = model(SCHEMAS.SAVED_RECIPE, savedRecipeSchema);
