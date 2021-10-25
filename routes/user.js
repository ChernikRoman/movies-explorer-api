const route = require('express').Router();
const { getMyUserData, patchMyUserData } = require('../controllers/user');

route.post('/me', getMyUserData);
route.get('/me', getMyUserData);
route.patch('/me', patchMyUserData);

module.exports = route;
