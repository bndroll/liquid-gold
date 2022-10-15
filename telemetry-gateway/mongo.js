const mongoose = require('mongoose');

let connection = null;

async function connectToDB() {
    if (!connection) {
        connection = await mongoose.connect(
            `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`, {
                auth: {
                    username: process.env.MONGO_USERNAME,
                    password: process.env.MONGO_PASSWORD,
                    authdb: process.env.MONGO_DATABASE
                },
                authSource: "admin",
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
            );
    }

    return connection;
  }


  
const schema = new mongoose.Schema({ coordinates: {lat: Number, lon: Number} });
const Transport = mongoose.model('Transport', schema);

module.exports = {
    Transport,
    connectToDB
}