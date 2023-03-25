const config = require('../config/config');
const nodemailer = require('nodemailer');

const owner = {
    name: config.GMAIL_NAME,
    address: config.GMAIL_EMAIL,
};

const gmailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.GMAIL_EMAIL,
        pass: config.GMAIL_PASSWORD,
    },
});

const notifyNewUserByEmail = async (userData) => {
    const mailOptions = {
        from: owner,
        to: config.GMAIL_EMAIL,
        subject: 'Nuevo usuario creado',
        html: `Un nuevo usuario ha sido creado. Ve su información a continuación:\n\n\n ${userData}`,
    };
    const response = await gmailTransporter.sendMail(mailOptions);
    return response;
};

const notifyNewOrderByEmail = async (orderData) => {
    const mailOptions = {
        from: owner,
        to: config.GMAIL_EMAIL,
        subject: 'Nuevo orden generada',
        html: `Una nueva orden ha sido generada. Ve su información a continuación:\n\n\n ${orderData}`,
    };
    const response = await gmailTransporter.sendMail(mailOptions);
    return response;
};

const NotificationService = {
    notifyNewUserByEmail,
    notifyNewOrderByEmail
};

module.exports = NotificationService;