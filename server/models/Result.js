const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);