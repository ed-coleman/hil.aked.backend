const { Schema, model } = require("mongoose");

const NewEventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
  type: String,
  default: '-'
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    requried: true,
  },
  link: {String,
    default: '-'
  },
  time: String,
  image: String,
});

const NewEvent = model("NewEvent", NewEventSchema);

module.exports = NewEvent;
