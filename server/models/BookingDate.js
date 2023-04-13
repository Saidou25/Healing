const { Schema, model } = require("mongoose");

const bookingdateSchema = new Schema({
     isBooked: {
        type: String,
        repuire: true,
        trim: true,
    },
    finalDateISO: {
        type: String,
        repuire: true,
        trim: true,
    },
   appDay: {
        type: String,
        repuire: true,
        trim: true,
    },
        appMonth: {
            type: String,
            repuire: true,
            trim: true,
        },
        appDate: {
            type: Number,
            repuire: true,
            trim: true,
        },
        appTime: {
            type: String,
            repuire: true,
            trim: true,
        },
        appointment: {
            type: String,
            repuire: true,
            trim: true,
        },
        appYear: {
            type: Number,
            repuire: true,
            trim: true,
        }
});

const Bookingdate = model('bookingdate', bookingdateSchema);

module.exports = Bookingdate;