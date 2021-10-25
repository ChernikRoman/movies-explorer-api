const route = require('express').Router();
const { getMyUserData, patchMyUserData } = require('../controllers/user');

route.get('/me', getMyUserData);
route.patch('/me', patchMyUserData);

module.exports = route;
