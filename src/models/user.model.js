const { model, Schema } = require("mongoose");
const { SCHEMAS } = require("../utilities/constants");

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
      required: false,
    },
    // phone: {
    //     type: String,
    //     required: true,
    // },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("posts", {
  ref: SCHEMAS.POST_SCHEMA,
  localField: "_id",
  foreignField: "creator",
});

module.exports = model(SCHEMAS.USER_SCHEMA, userSchema);
