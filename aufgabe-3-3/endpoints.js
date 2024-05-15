import express from 'express';

const app = express();
const port = 3000;

app.get('/now', (request, response) => {
  response.send(new Date().toLocaleString("de-CH"));
});

const names = [
  "Hans",
  "Franz",
  "Jack",
  "Daniel",
  "Susanne",
  "Ceren",
  "Sara",
  "Josef",
  "Kunigunde"
]

app.get('/name', (request, response) => {
  const index = Math.floor(Math.random() * names.length);
  response.send(names[index]);
})

app.listen(port, () => {
  console.log(`Endpoints app listening on port ${port}`);
});
