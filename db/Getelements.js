const mongoose = require("mongoose");

const elSchema = new mongoose.Schema({
 title: { type: String},
  category: Array,
  type: {
    type: String,
  },
  date: { type: Date, default: Date.now },

  userId: { type: String },
});

module.exports = mongoose.model("getelements", elSchema);
