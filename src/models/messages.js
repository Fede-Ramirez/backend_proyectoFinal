const mongoose = require('mongoose');
const { userCollectionName } = require('./users');

const messageCollectionName = 'message';

const messageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: userCollectionName,
            required: true,
        },
        type: { type: String, required: true },
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