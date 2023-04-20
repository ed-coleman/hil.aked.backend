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
  city: String,
  day: {
    type: Number,
    required: false,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    requried: true,
  },
  time: String,
  image: String,
});

const NewEvent = model("NewEvent", NewEventSchema);

module.exports = NewEvent;
