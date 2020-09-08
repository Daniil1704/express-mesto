const express = require('express');

const path = require('path');
const uRouters = require('./routes/users.js');
const cRouters = require('./controll/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', uRouters);
app.use('/', cRouters);

// в случае запроса на не существующий адрес, вернем статус 404 и сообщение об ошибке
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Ссылка на сервер ${PORT}`);
});