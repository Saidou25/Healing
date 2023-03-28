const { Schema, model } = require("mongoose");

const testSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}
)

const Test = model('test', testSchema);

module.exports = Test;