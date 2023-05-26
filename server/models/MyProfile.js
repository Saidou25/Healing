const { Schema, model } = require("mongoose");
// const bcrypt = require("bcrypt");

const profileSchema = new Schema({
       mepet: {
        type: String,
        repuire: false,
        trim: true,

    },
       username: {
        type: String,
        repuire: true,
        trim: true,

    },
    patientgender: {
        type: String,
        repuire: false,
        trim: true,

    },
    birthdate: {
        type: String,
        repuire: false,
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
        type: String,
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
        repuire: false,
        trim: true,

    },
    patientemail: {
        type: String,
        require: false,
        trim: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
     isBooked: {
        type: String,
        repuire: false,
        trim: true,
    },
   appDay: {
        type: String,
        repuire: false,
        trim: true,
    },
    patientState: {
            type: String,
            repuire: true,
            trim: true,
        },
    appMonth: {
            type: String,
            repuire: false,
            trim: true,
        },
        appDate: {
            type: Number,
            repuire: false,
            trim: true,
        },
        appTime: {
            type: String,
            repuire: false,
            trim: true,
        },
        appointment: {
            type: String,
            repuire: false,
            trim: true,
        },
        appYear: {
            type: Number,
            repuire: false,
            trim: true,
        },
        pets: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Pet'
            }
        ]
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;