const { Schema, model } = require("mongoose");

const bookingdateSchema = new Schema({
  username: {
    type: String,
    repuire: false,
    trim: true,
  },
  startDate: {
    type: String,
    repuire: true,
    trim: true,
  },
  digitalAppointment: {
    type: String,
    repuire: true,
    trim: true,
  },
  appointmentString: {
    type: String,
    repuire: true,
    trim: true,
  },
  reason: {
    type: String,
    repuire: true,
    trim: true,
  },
});

const Bookingdate = model("Bookingdate", bookingdateSchema);

module.exports = Bookingdate;
