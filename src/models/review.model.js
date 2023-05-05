const { model, Schema } = require("mongoose");
const { SCHEMAS } = require("../utilities/constants");

const reviewSchema = new Schema(
  {
    reviewerId: { type: Schema.Types.ObjectId, ref: SCHEMAS.USER_SCHEMA },
    recipeId: { type: Schema.Types.ObjectId, ref: SCHEMAS.RECIPE_SCHEMA },
    rate: { type: Number, default: 1, required: true },
    reviewMessage: {type: String, required: true}
  },
  { timestamps: true }
);

module.exports = model(SCHEMAS.REVIEW_SCHEMA, reviewSchema);
