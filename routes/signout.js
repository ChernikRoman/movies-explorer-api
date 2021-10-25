const route = require('express').Router();
const { logout } = require('../controllers/login');

route.get('/', logout);

module.exports = route;
