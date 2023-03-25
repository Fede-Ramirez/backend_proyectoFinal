const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.set('strictQuery', false)

const connectDatabase = () => {
    return mongoose.connect(config.MONGO_ATLAS_URL, { 
        useNewUrlParser: true 
    });
};

module.exports = { connectDatabase };