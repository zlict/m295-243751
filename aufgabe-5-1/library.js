import express from 'express';

const app = express();
app.use(express.json());
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
})

app.listen(port, () => {
  console.log(`Library app listening on port ${port}`);
});
