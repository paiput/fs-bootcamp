require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('build'));
app.use(express.json());

morgan.token('req-data', (req) => JSON.stringify(req.body));

const customFormat = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['req-data'](req)
  ].join(' ')
}, {
  skip: function (req, res) { return res.statusCode !== 201 }
});

// logs a custom format with the data sent only in HTTP POST requests
app.use(customFormat);
// logs the tiny format for the rest of the requests 
app.use(morgan('tiny', {
  skip: function (req, res) { return res.statusCode === 201 }
}));

const db = process.env.MONGODB_URI;

mongoose.connect(db)
.then(res => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.log('Error connecting to MongoDB', err.message);
});

const PhonebookEntry = require('./models/PhonebookEntry');

app.get('/api/persons', (req, res, next) => {
  PhonebookEntry.find({})
    .then(persons => {
      res.json(persons);
    })
    .catch(err => next(err));
});

app.get('/info', (req, res) => {
  PhonebookEntry.find({})
    .then(persons => {
      res.send(`<p>Phonebook has info of ${persons.length} people</p><p>${new Date()}</p>`);
    })
    .catch(err => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  PhonebookEntry.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;
  
  if (!name || !number) {
    return res.status(400).send({ error: 'The name or number is missing' });
  };

  const personToAdd = new PhonebookEntry ({
    name,
    number
  });

  personToAdd.save()
    .then(savedPerson => {
      res.status(201).json(savedPerson);
    })
    .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  };
  PhonebookEntry.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson);
    })
    .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  PhonebookEntry.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send('<h2 style="color: red">Error, unknown endpoint</h2>');
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);