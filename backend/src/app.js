const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const studentRoutes = require('./routes/studentRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes);



module.exports = app;