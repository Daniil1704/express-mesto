const router = require('express').Router();
const { getUsers, getUserById } = require('../controll/users.js');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

module.exports = router;
