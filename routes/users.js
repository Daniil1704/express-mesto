const router = require('express').Router();
const { getUsers, getUserById,buildUser } = require('../controllers/users.js');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.post('/users',buildUser);

module.exports = router;
