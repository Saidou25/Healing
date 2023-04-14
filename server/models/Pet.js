const { Schema, model } = require('mongoose');

const petSchema = new Schema({
    petBreed: {
        type: String,
        required: true,
        trim: true,

    },
    petName: {
        type: String,
        required: true,
        trim: true,
    },
    petWeight: {
        type: Number,
        required: true,
        trim: true,
    },
    petGender: {
        type: String,
        required: true,
        trim: true,
    },
    petReason: {
        type: String,
        required: true,
        trim: true,
    },
    petAge: {
        type: String,
        required: true,
        trim: true
    }

});

const Pet = model('pet', petSchema);

module.exports = Pet;