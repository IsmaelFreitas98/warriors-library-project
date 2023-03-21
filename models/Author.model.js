const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const authorSchema = new Schema(
  {
    name: String,
    age: Number,
    country: String
  },
  {
    timestamps: true
  }
);

const Author = model("Author", authorSchema);

module.exports = Author;
