const { Schema, model } = require("mongoose");

const patientSchema = new Schema({
    patientname: {
        type: String,
        repuire: true,
        trim: true,
    }, 
    age: {
        type: Number,
        required: true,
        trim: true,
    }
});

const Patient = model('patient', patientSchema);

module.exports = Patient;