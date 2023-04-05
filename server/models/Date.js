const { Schema, model } = require("mongoose");

const dateSchema = new Schema({
    startDate: {
        type: String,
        repuire: true,
        trim: true,
    }
});

const Date = model('date', dateSchema);

module.exports = Date;