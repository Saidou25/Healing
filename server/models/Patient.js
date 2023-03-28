const { Schema, model } = require("mongoose");

const patientSchema = new Schema({
    name: {
        type: String,
        repuire: true,
        trim: true,
    }
});

const Patient = model('patient', patientSchema);

module.exports = Patient;