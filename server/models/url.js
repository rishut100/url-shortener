const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  _id: { type: String },
  url: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
  },
  count: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = URL = mongoose.model("URL", UrlSchema);
