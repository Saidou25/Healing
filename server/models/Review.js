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
  },
  reviewText: {
  type: String,
  required: 'You need to leave a review!',
  maxlength: 280,
  trim: true,
},
  rating: {
  type: String,
  required: false,
}
});

const Review = model('Review', reviewSchema);

module.exports = Review;