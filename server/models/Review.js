const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: 'Your review needs a title!',
    trim: true,
    minlength: 5
  },
  reviewText: {
  type: String,
  required: 'You need to leave a review!',
  minlength: 5,
  maxlength: 280,
  trim: true,
}
});

const Review = model('Review', reviewSchema);

module.exports = Review;