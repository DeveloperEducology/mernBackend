const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  
  name: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("authors", authorSchema);