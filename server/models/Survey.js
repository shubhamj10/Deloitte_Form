const mongoose = require('mongoose');

const ratingsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  ratings: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  weightage: { // Add weightage for each question
    type: Number,
    required: true,
  },
});

const surveySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  ratings: [ratingsSchema], // Include the array of questions with ratings and weightage
  averageRating: {
    type: Number,
    default: 0,
  },
  averageWeightage: { // Add field to store average weightage
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  submittedByUser: {
    type: Boolean,
    default: true,
  },
});

// Middleware to calculate averageRating and averageWeightage
surveySchema.pre('save', function (next) {
  if (this.ratings && this.ratings.length > 0) {
    // Calculate averageRating
    const numericRatings = this.ratings
      .filter((item) => typeof item.ratings === 'number')
      .map((item) => item.ratings);

    const sumRatings = numericRatings.reduce((acc, rating) => acc + rating, 0);
    this.averageRating = numericRatings.length > 0 ? sumRatings / numericRatings.length : 0;

    // Calculate averageWeightage
    const numericWeightages = this.ratings
      .filter((item) => typeof item.weightage === 'number')
      .map((item) => item.weightage);

    const sumWeightages = numericWeightages.reduce((acc, weight) => acc + weight, 0);
    this.averageWeightage = numericWeightages.length > 0 ? sumWeightages / numericWeightages.length : 0;
  } else {
    this.averageRating = 0;
    this.averageWeightage = 0;
  }
  next();
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
