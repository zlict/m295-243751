import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
const port = 3000;

let names = [
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

app.get('/now', (request, response) => {
  response.send(new Date().toLocaleString("de-CH", {timeZone: request.query.tz}));
});

app.get('/names', (_, response) => {
  response.send(names);
});

app.delete('/names', (request, response) => {
  const nameToDelete = request.query.name;
  names = names.filter((name) => name !== nameToDelete);
  response.sendStatus(204);
});

app.post('/test', (req, res) => {
  console.log(req.body);
  res.sendStatus(204);
})

app.listen(port, () => {
  console.log(`Endpoints app listening on port ${port}`);
});
