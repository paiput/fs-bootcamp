const { Schema, model } = require('mongoose');

const phonebookEntrySchema = new Schema({
  name: String,
  number: String
});

module.exports = model('PhonebookEntry', phonebookEntrySchema);