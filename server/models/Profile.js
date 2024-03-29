const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  username: {
    type: String,
    // repuire: false,
    trim: true,
  },
  patientgender: {
    type: String,
    // repuire: false,
    trim: true,
  },
  birthdate: {
    type: String,
    // repuire: false,
    trim: true,
  },
  patientfirstname: {
    type: String,
    // repuire: false,
    trim: true,
    minlength: 2,
  },
  patientlastname: {
    type: String,
    // repuire: false,
    trim: true,
    minlength: 2,
  },
  patientaddress: {
    type: String,
    // repuire: false,
    trim: true,
    minlength: 5,
  },
  patientzip: {
    type: String,
    // repuire: false,
    trim: true,
    minlength: 5,
    maxlength: 5,
  },
  patientcity: {
    type: String,
    // repuire: true,
    trim: true,
    minlength: 2,
  },
  patientnumber: {
    type: String,
    // require: "you need to leave a phone number",
    trim: true,
  },
  patientemail: {
    type: String,
    // require: false,
    trim: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  patientState: {
    type: String,
    // repuire: true,
    trim: true,
  },
});

const Profile = model("profile", profileSchema);

module.exports = Profile;
