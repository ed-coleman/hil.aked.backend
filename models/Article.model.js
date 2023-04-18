const { Schema, model } = require("mongoose");

const NewArticleSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    published: {
        type: String,
    },
    year: {
        type: Number
    },
    image: String,
    link: String,
    category: String,
})

const NewArticle = model("NewArticle", NewArticleSchema)

module.exports = NewArticle