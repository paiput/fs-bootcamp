const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const phonebookEntrySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  }
});
phonebookEntrySchema.plugin(uniqueValidator);

phonebookEntrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject.__v;
  }
});

module.exports = model('PhonebookEntry', phonebookEntrySchema);