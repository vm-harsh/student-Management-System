const express = require('express');
const { createStudent, getAllStudents, getStudentById, deleteStudent, updateStudent } = require('../controllers/studentController');

const Router = express.Router();


Router.post('/create',createStudent);
Router.get('/all',getAllStudents);
Router.get('/:id',getStudentById);
Router.delete('/:id',deleteStudent);
Router.put('/:id',updateStudent);


module.exports = Router;