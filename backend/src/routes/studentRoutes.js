const express = require('express');
const { createStudent } = require('../controllers/studentController');

const Router = express.Router();


Router.post('/create',createStudent);


module.exports = Router;