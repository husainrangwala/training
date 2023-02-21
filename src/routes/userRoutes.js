const express = require('express');
const userController = require('../controllers/userController');
const routes = express.Router()

routes.get("/user", userController.getAllUsers);
routes.post("/user", userController.addNewUser);
routes.put("/user/:id", userController.updateUser);

module.exports = routes