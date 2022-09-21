const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  // userId: { type: String },
  question: { type: String },
  answer_options: Array,
  type: { type: String },

  correct_answer: { type: String },
});

module.exports = mongoose.model("questions", questionSchema);
