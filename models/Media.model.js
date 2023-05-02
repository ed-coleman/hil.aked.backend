
const { Schema, model } = require("mongoose")

const NewMediaSchema = new Schema ({
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
    link: String,
    preview: String,
})

const NewMedia = model("NewMedia", NewMediaSchema);

module.exports = NewMedia;