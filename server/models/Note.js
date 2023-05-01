const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  noteTitle: {
    type: String,
    required: true,
    trim: true
  },
  // numbers: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'number'
  //   }
  // ]
});

const Note = model('Note', noteSchema);

module.exports = Note;