const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  noteTitle: String,
  noteBody: String,
  categoryId: String
});

module.exports = mongoose.model('Note', noteSchema);