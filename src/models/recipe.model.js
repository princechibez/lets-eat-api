const { model, Schema } = require("mongoose");
const { SCHEMAS } = require("../utilities/constants");

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    healthBenefits: { type: [String] },
    readyInMinutes: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    ingredients: [{type: String}],
    instructions: { type: [String], required: true },
    diet: { type: [String], required: true },
    cuisineType: { type: [String], required: true },
    dishType: { type: [String], required: true },
  },
  { timestamps: true }
);

recipeSchema.virtual("reviews", {
  ref: SCHEMAS.REVIEW_SCHEMA,
  localField: "_id",
  foreignField: "recipeId",
});

module.exports = model(SCHEMAS.RECIPE_SCHEMA, recipeSchema);