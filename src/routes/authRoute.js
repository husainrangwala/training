const { Router } = require('express')
const express = require('express')

const route = express.Router()

const authContoller = require('../controllers/authController')

route.post('/login',authContoller.login)

module.exports = route;