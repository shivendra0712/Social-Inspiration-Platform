require('dotenv').config();
const app= require('./src/app')
const connect = require('./src/db/db')

connect();

const port = process.env.PORT || 5000;

app.listen(port , ()=>{
    console.log(`server is started`)
})