const mongoose = require('mongoose');

const messageCollectionName = 'message';

const messageSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        type: { type: String, default: 'usuario' },
        message: { type: String, required: true },
    },
    { versionKey: false, timestamps: true },
);

const MessageModel = mongoose.model(
    messageCollectionName,
    messageSchema,
);

module.exports = {
    MessageModel
};