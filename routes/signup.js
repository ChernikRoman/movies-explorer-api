const route = require('express').Router();
const { createUser } = require('../controllers/user');

route.post('/', createUser);

module.exports = route;
