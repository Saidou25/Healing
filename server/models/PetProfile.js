const { Schema, model } = require("mongoose");

const petSchema = new Schema({
  petBreed: {
    type: String,
    required: true,
    trim: true,
  },
  profileId: {
    type: String,
    required: false,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  petName: {
    type: String,
    required: true,
    trim: true,
  },
  petWeight: {
    type: Number,
    required: true,
    trim: true,
  },
  petGender: {
    type: String,
    required: true,
    trim: true,
  },
  petKind: {
    type: String,
    required: false,
    trim: true,
  },
  petAge: {
    type: String,
    required: true,
    trim: true,
  },
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
