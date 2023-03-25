const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userCollectionName = 'user';

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true, min: 18 },
        admin: { type: Boolean, default: false },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
        },
    },
    { versionKey: false, timestamps: true },
);

userSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

const UserModel = mongoose.model(
    userCollectionName, 
    userSchema);

module.exports = { 
    userCollectionName, 
    UserModel 
};