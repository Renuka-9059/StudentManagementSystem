const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getDashboardStats,
} = require("../controllers/studentController");

// Dashboard Statistics
router.get("/stats/dashboard", getDashboardStats);

// Get all students
router.get("/", getStudents);

// Get single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add student
router.post("/", addStudent);

// Update student
router.put("/:id", updateStudent);

// Delete student
router.delete("/:id", deleteStudent);

module.exports = router;