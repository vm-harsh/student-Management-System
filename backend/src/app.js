const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const studentRoutes = require('./routes/studentRoutes');


const app = express();
app.use(express.json());

app.use('/api/students', studentRoutes);



module.exports = app;