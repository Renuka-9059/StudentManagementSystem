const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    duration: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);