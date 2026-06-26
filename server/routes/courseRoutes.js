const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

const {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// Get all courses
router.get("/", getCourses);

// Get single course
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add course
router.post("/", addCourse);

// Update course
router.put("/:id", updateCourse);

// Delete course
router.delete("/:id", deleteCourse);

module.exports = router;