const { Schema, model } = require("mongoose");

const patientSchema = new Schema({
    patientfirstname: {
        type: String,
        repuire: true,
        trim: true,
    }, 
    patientlastname: {
        type: String,
        require: true,
        trim: true
    },
    age: {
        type: Number,
        require: true,
        trim: true,
    },
    patientemail: {
        type: String,
        require: true,
        trim: true
    }
});

const Patient = model('patient', patientSchema);

module.exports = Patient;