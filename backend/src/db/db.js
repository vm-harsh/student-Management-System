const {Client} = require('pg');

const con = new Client({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  port:process.env.DB_PORT,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
})

const connectDB = async()=>{
  try {
    await con.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
  }
}

module.exports = {con, connectDB};