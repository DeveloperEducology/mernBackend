
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      minlength: 10,
      maxlength: 1000,
    },
    answerOptions: {
      type: [AnswerOptionSchema],
      default: undefined,
      validate: {
        validator: () => {
          return value && value.length === 4;
        },
        message: "Answer options should be 4.",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", QuestionSchema);
