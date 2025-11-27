const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.get('/hello',(req,res)=>{
  res.send('Hello World! harsh verma is the best');
})


module.exports = app;