const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
  question: { type: String },
 
 
  options:  Array,
  type: {
    type: String,
  },
  checked:  Array,
  type: {
    type: String,
  },
  category:  Array,
  type: {
    type: String,
  },
  selected: { type: String},
  date: { type: Date, default: Date.now },
  
  // created_by: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "author",
  //   required: "This field is required.",
  // },

    userId: { type: String},
});

module.exports = mongoose.model("elements", elementSchema);