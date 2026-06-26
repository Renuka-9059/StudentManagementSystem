const express = require("express");
const router = express.Router();

const {
  getAttendance,
  getSingleAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

// Get All Attendance
router.get("/", getAttendance);

// Get Single Attendance
router.get("/:id", getSingleAttendance);

// Add Attendance
router.post("/", addAttendance);

// Update Attendance
router.put("/:id", updateAttendance);

// Delete Attendance
router.delete("/:id", deleteAttendance);

module.exports = router;