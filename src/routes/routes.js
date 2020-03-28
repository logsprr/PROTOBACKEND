const express = require("express");
//data
const multer = require('../database/multer');
//services
const authToken = require('../services/auth');
const firebaseUpload = require('../services/firebase');
//controllers
const UserController = require('../controllers/User');
const DriveController = require('../controllers/Drive');
//router
const routes = express.Router();
//User routes
routes.post('/user/create', UserController.createUser);
routes.post('/user/authenticate', UserController.authenticateUser);
routes.get('/user/list', authToken, UserController.listUsers);
routes.post('/user/update', authToken, UserController.updateUser);
routes.post('/user/delete', authToken, UserController.deleteUser);
routes.post('/user/resetpassword', authToken, UserController.resetPassword);
//Files routes
routes.post('/file/new/upload/files/drive', multer.single('file'), authToken, firebaseUpload, DriveController.updateDrive);
routes.post('/file/new/upload/photo/user', multer.single('file'), authToken, firebaseUpload, UserController.updateUser);
module.exports = routes;