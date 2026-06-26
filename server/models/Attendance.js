const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    studentName: String,
    course: String,
    date: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);