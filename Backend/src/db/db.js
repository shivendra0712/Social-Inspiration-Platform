const mongoose = require("mongoose")


function connect(){
    mongoose.connect(process.env.MONGODB_KEY)
    .then(()=>{
        console.log('db is connected');
    })
    .catch((err)=>{
        console.log('error',err);
    })
}

module.exports = connect;