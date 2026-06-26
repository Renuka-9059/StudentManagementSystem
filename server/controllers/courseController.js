const Course = require("../models/Course");

// Get All Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Course
exports.addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();

    res.status(201).json({
      message: "Course Added Successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: "Course Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};