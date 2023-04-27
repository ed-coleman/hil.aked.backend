const { Schema, model } = require("mongoose");
const { stringify } = require("uuid");

const NewArticleSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    published: {
        type: String,
    },
    year: {
        type: String,
    },
    month: {
        type: String
    },
    image: String,
    link: String,
    preview: String,
    category: {
        type: String,
        enum: ['report', 'chapter', 'article', 'journalism', 'investigation', 'op-ed', 'press']
    },
})

const NewArticle = model("NewArticle", NewArticleSchema)

module.exports = NewArticle