const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const attendanceRoutes = require("./routes/attendanceRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const resultRoutes = require("./routes/resultRoutes");

// Routes
app.use("/api/attendance", attendanceRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/results", resultRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Student Management System API Running...");
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log(err);
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});