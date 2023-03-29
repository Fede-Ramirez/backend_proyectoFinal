require('dotenv').config()

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV || 'mongodb://localhost:27017/ProyectoFinal',
    PORT: process.env.PORT || 8080,
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY || 'shhhh',
    GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'email@gmail.com',
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
    GMAIL_NAME: process.env.GMAIL_NAME || 'GMAIL owner name',
};