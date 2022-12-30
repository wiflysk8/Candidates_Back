const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();

const urlDb = process.env.MONGO_DB;

const connect = async () => {
    try{
        await mongoose.connect(urlDb, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`Connected with DB succesfully`);
    } catch(error){
        console.log('Error to connect with the DB')
    };
}

module.exports = {
    connect
};