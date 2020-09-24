const path = require('path');
const readFile = require('../readfile/readFile.js');
const User = require('../models/user');

const getUsers = (req, res) => readFile(path.join(__dirname, '..', 'data', 'users.json'))
  .then((data) => {
    res.status(200).send(JSON.parse(data));
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });

const getUserById = (req, res) => {
  readFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => {
      const user = JSON.parse((data)).find((item) => item._id === req.params.id);
      if (!user) {
        res.status(404).send({ message: `Нет пользователя с id ${req.params.id}` });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const buildUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};
module.exports = {
  getUsers,
  getUserById,
  buildUser
};
