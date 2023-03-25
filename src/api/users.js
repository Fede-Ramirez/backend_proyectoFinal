const { UserModel } = require('../models');

const find = async(id) => {
    if (id) {
        const user = await UserModel.findById(id);
        return user;
    }

    const user = await UserModel.find();
    return user;
};

const findByEmail = async(email) => {
    const user = await UserModel.findOne({ email });
    return user;
};

const create = async(newUser) => {
    const user = await UserModel.create(newUser);
    return user;
};

const update = (id, data) =>
    UserModel.findByIdAndUpdate(id, data, {
        new: true,
});

const remove = (id) => {
    UserModel.findByIdAndDelete(id);
};

module.exports = {
    find,
    findByEmail,
    create,
    update,
    remove,
};