import express from 'express';
import swaggerAutogen from 'swagger-autogen';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: 'json' };

const swaggerGenerator = swaggerAutogen();
const app = express();
app.use(express.json());
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = 3000;

let books = [
  { isbn: "978-3-7466-3938-5", title: "Die sieben Schwestern", author: "Lucinda Riley", year: 2014 },
  { isbn: "978-3-498-03467-7", title: "Origin", author: "Dan Brown", year: 2017 },
  { isbn: "978-3-426-28153-5", title: "Die Känguru-Apokryphen", author: "Marc-Uwe Kling", year: 2018 },
  { isbn: "978-3-608-96159-1", title: "Die Geschichte der Bienen", author: "Maja Lunde", year: 2017 },
  { isbn: "978-3-257-07164-6", title: "Tyll", author: "Daniel Kehlmann", year: 2017 },
  { isbn: "978-3-570-10348-3", title: "Die Tribute von Panem - Flammender Zorn", author: "Suzanne Collins", year: 2010 },
  { isbn: "978-3-442-71320-6", title: "Das Paket", author: "Sebastian Fitzek", year: 2016 },
  { isbn: "978-3-10-397271-1", title: "QualityLand", author: "Marc-Uwe Kling", year: 2017 },
  { isbn: "978-3-442-49058-8", title: "Das Labyrinth der Träumenden Bücher", author: "Walter Moers", year: 2011 }
];

let lends = [];

app.get('/books', (request, response) => {
  response.send(books);
});

app.get('/books/:isbn', (request, response) => {
  response.send(books.find((book) => book.isbn === request.params.isbn));
});

app.post('/books', (request, response) => {
  books = [...books, request.body];
  response.send(request.body);
});

app.put('/books/:isbn', (request, response) => {
  books = books.map(
    (book) => book.isbn === request.params.isbn ? request.body : book
  );
  response.send(request.body);
})

app.delete('/books/:isbn', (request, response) => {
  books = books.filter((book) => book.isbn !== request.body.isbn);
  response.sendStatus(204);
});

app.get('/lends', (request, response) => {
  response.send(lends);
});

app.post('/lends', (request, response) => {
  if(request.body.isbn && books.findIndex((book) => book.isbn === request.body.isbn) === -1) {
    return response.sendStatus(404);
  }

  const lend = {...request.body, id: crypto.randomUUID(), borrowed_at: new Date().getTime()}
  lends = [...lends, lend];
  response.send(lend);
});

app.delete('/lends/:id', (request, response) => {
  lends.map(
    (lend) => lends.id === request.params.id ? {...lend, returned_at: new Date().getTime()} : lend
  )
});

app.listen(port, () => {
  console.log(`Library app listening on port ${port}`);
});

const doc = {
  info: {
    title: 'Library',
    description: 'Meine tolle Bibliothek API'
  },
  host: 'localhost:3000'
};

const outputFile = './aufgabe-6-2/swagger-output.json';
const routes = ['./aufgabe-6-2/library.js'];

swaggerGenerator(outputFile, routes, doc);
