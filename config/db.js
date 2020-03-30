const mongoose = require('mongoose');
const config = require('config');
//grabs the value from the default.json so we can connect to our database
const db = config.get('mongoURI');

const connectDb = async () =>{

    try{
     await mongoose.connect(db, {
        useNewUrlParser : true,
        useCreateIndex :true,
        useFindAndModify :false,
        useUnifiedTopology: true
    });
    console.log('MongoDb connected');
    } catch(error){
        console.log(error.message);
        process.exit(1);
    }

    // mongoose.connect(db, {
    //     useNewUrlParser : true,
    //     useCreateIndex :true,
    //     useFindAndModify :false,
    //     useUnifiedTopology: true
    // }).then(() => console.log("MongoDb connected"))
    // .catch((error) =>{
    //     console.log(error.message);
    //     process.exit(1);
    // })
}

module.exports = connectDb;