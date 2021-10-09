const { Schema, model } = require('mongoose');

const phonebookEntrySchema = new Schema({
  name: String,
  number: String
});

phonebookEntrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject.__v;
  }
});

module.exports = model('PhonebookEntry', phonebookEntrySchema);