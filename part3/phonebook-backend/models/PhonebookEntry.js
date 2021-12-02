const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const phonebookEntrySchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
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