const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const {con} = require('./db/db');


const app = express();

app.get('/hello',(req,res)=>{
  res.send("Hello World");
})

// con.query('SELECT * FROM students',(err,res)=>{
//   if(!err){
//     console.log(res.rows);
//   }else{
//     console.log(err.message);
//   }
// })


module.exports = app;