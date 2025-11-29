const app = require('./src/app');
const {connectDB} = require('./src/db/db');


const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=> {
  connectDB();
  console.log(`Server is running on PORT ${PORT}`);
})