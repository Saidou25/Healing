const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  reviewText: {
  type: String,
  required: 'You need to leave a review!',
  minlength: 1,
  maxlength: 280,
  trim: true,
}
});

const Review = model('Review', reviewSchema);

module.exports = Review;