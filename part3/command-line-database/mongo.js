const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://paiput:${password}@cluster0.mas2j.mongodb.net/phonebook-db?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

// create adding and info methods
if (process.argv.length > 3) {
  const person = new Person({
    name,
    number
  });

  person.save().then((result) => {
    console.log(`Add ${name} number ${number} to phonebook`);
    console.log(result);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}