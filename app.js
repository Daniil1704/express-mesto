const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const uRouters = require('./routes/users.js');
const cRouters = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/', uRouters);
app.use('/', cRouters);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Ссылка на сервер ${PORT}`);
});
