const Student = require("../models/Student");

// Get All Students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Student
exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    res.status(201).json({
      message: "Student Added Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Student Updated Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const students = await Student.find();

    const totalStudents = students.length;

    const totalCourses = [...new Set(students.map((s) => s.course))].length;

    const averageAttendance =
      totalStudents > 0
        ? (
            students.reduce((sum, s) => sum + Number(s.attendance), 0) /
            totalStudents
          ).toFixed(2)
        : 0;

    const averageMarks =
      totalStudents > 0
        ? (
            students.reduce((sum, s) => sum + Number(s.marks), 0) /
            totalStudents
          ).toFixed(2)
        : 0;

    res.status(200).json({
      totalStudents,
      totalCourses,
      averageAttendance,
      averageMarks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};