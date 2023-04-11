const { Schema, model } = require("mongoose");

const bookingdateSchema = new Schema({
    startDate: {
        type: String,
        repuire: true,
        trim: true,
    },
   
});

const Date = model('bookingdate', bookingdateSchema);

module.exports = Date;