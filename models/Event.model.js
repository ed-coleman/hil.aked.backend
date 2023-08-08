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
    type: String,

  },
  month: {
    type: String,
  
  },
  year: {
    type: Number,
  
  },
  link: {
    String
  },
  time: String,
  image: String,
});

const NewEvent = model("NewEvent", NewEventSchema);

module.exports = NewEvent;
