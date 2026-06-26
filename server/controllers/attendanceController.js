const Attendance = require("../models/Attendance");

// Get All Attendance
exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Attendance
exports.getSingleAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance Record Not Found",
      });
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Attendance
exports.addAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();

    res.status(201).json({
      message: "Attendance Added Successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Attendance
exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Attendance Updated Successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Attendance
exports.deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);

    res.json({
      message: "Attendance Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};