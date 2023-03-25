const mongoose = require('mongoose');

const categoryCollectionName = 'category';

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
    },
    { versionKey: false, timestamps: true },
);

const CategoryModel = mongoose.model(
    categoryCollectionName,
    categorySchema,
);

module.exports = {
    categoryCollectionName,
    CategoryModel
}