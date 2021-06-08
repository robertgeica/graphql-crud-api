const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tagName: String,
  tagColor: String,
  noteId: []
});

module.exports = mongoose.model('Tag', tagSchema);