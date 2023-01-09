const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');


route.get('/', homeController.index);
route.get('/signup', registerController.index);
route.post('/signup/entry', registerController.register);

module.exports = route;