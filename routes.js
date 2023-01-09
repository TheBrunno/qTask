const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const accountController = require('./src/controllers/accountController');

const { loginRequired } = require('./src/middlewares/loginMiddlewares');


route.get('/', homeController.index);

route.get('/signup', registerController.index);
route.post('/signup/entry', registerController.register);

route.get('/signin', loginController.index);
route.post('/signin/entry', loginController.login);

route.get('/myaccount', loginRequired, accountController.index);
route.get('/logout', loginRequired, accountController.logout);

module.exports = route;