const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: "Please choose a username",
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: "enter a valid email",
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: "Please provide a 5 digit password",
    unique: true,
    minlength: 5,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  bookingdates: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bookingdate",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
