const { Schema, model } = require("mongoose");

const patientSchema = new Schema({
    mepet: {
        type: String,
        repuire: true,
        trim: true,

    },
    patientgender: {
        type: String,
        repuire: true,
        trim: true,

    },
    birthdate: {
        type: String,
        repuire: true,
        trim: true,

    },
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
    patientaddress: {
        type: String,
        repuire: true,
        trim: true,

    },
    patientzip: {
        type: Number,
        require: true,
        trim: true,

    },
    patientcity: {
        type: String,
        repuire: true,
        trim: true,

    },
    patientnumber: {
        type: String,
        require: true,
        trim: true,

    },
    patientreason: {
        type: String,
        repuire: true,
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