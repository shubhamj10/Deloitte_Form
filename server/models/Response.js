const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema({
  question: { type: String, required: true }, // Store question text
  ratings: { type: Number, required: true }, // Store numeric rating
});

const responseSchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true }, // Category name
    ratings: [ratingsSchema], // Store all questions & ratings in an array
    averageRating: { type: Number, default: 0 }, // Auto-calculated field
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Middleware to calculate `averageRating` before saving
responseSchema.pre("save", function (next) {
  if (this.ratings.length > 0) {
    const totalRating = this.ratings.reduce((sum, item) => sum + item.ratings, 0);
    this.averageRating = totalRating / this.ratings.length;
  } else {
    this.averageRating = 0;
  }
  next();
});

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;
