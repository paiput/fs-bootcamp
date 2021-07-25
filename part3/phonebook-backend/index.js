const morgan = require('morgan');
const express = require('express');

const app = express();

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

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info of ${persons.length} people</p><p>${new Date()}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  };
});

app.post('/api/persons', (req, res) => {
  const person = req.body;
  const personId = Math.floor(Math.random() * 1000);
  const personToAdd = {
    id: personId,
    name: person.name,
    number: person.number
  };

  if (!personToAdd.name || !personToAdd.number) {
    res.status(400).send({ error: 'The name or number is missing' });
    return;
  };
  
  const repeatedData = persons.filter(person => person.name === personToAdd.name || person.number === personToAdd.number);
  if (repeatedData.length > 0) {
    res.status(400).send({ error: 'The name or number already exists in the phonebook' });
    return;
  };

  persons = persons.concat(personToAdd);
  res.status(201).json(personToAdd);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  // console.log(id, typeof id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

const unknownEndpoint = (req, res) => {
  res.status(404).send('<h2 style="color: red">Error, unknown endpoint</h2>');
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);