const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const accountController = require('./src/controllers/accountController');
const taskController = require('./src/controllers/taskController')

const { loginRequired, unLoginRequired } = require('./src/middlewares/loginMiddlewares');
const { refresh } = require('./src/middlewares/taskMiddlewares');

route.get('/', homeController.index);

route.get('/signup', unLoginRequired, registerController.index);
route.post('/signup/entry', unLoginRequired, registerController.register);

route.get('/signin', loginController.index);
route.post('/signin/entry', loginController.login);

route.get('/myaccount', loginRequired, accountController.index);
route.get('/logout', loginRequired, accountController.logout);

route.get('/mytasks', loginRequired, taskController.index);

route.post('/mytasks/create', loginRequired, taskController.create, refresh);
route.post('/mytasks/done', loginRequired, taskController.edit, refresh);
route.post('/mytasks/remove', loginRequired, taskController.remove, refresh);
route.post('/mytasks/delete', loginRequired, taskController.delete, refresh);

module.exports = route;