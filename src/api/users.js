const { UserModel } = require('../models');

//Traer un usuario mediante ID
const find = async(id) => {
    if (id) {
        const user = await UserModel.findById(id);
        return user;
    }

    const user = await UserModel.find();
    return user;
};

//Traer un usuario mediante email
const findByEmail = async(email) => {
    const user = await UserModel.findOne({ email });
    return user;
};

//Crear un nuevo usuario
const create = async(newUser) => {
    const user = await UserModel.create(newUser);
    return user;
};

//Editar un usuario
const update = (id, data) =>
    UserModel.findByIdAndUpdate(id, data, {
        new: true,
});

//Eliminar un usuario
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