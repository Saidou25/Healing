const { Schema, model } = require("mongoose");
// const bcrypt = require("bcrypt");

const profileSchema = new Schema({
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
        trim: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
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
    patientState: {
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

const Profile = model('Profile', profileSchema);

module.exports = Profile;