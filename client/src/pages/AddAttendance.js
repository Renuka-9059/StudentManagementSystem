import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddAttendance() {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState({
    studentName: "",
    course: "",
    date: "",
    status: "Present",
  });

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/attendance", attendance);
      alert("Attendance Added Successfully");
      navigate("/attendance");
    } catch (error) {
      console.error(error);
      alert("Failed to Add Attendance");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="container mt-4">
          <h2>Add Attendance</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Student Name"
              name="studentName"
              value={attendance.studentName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Course"
              name="course"
              value={attendance.course}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              className="form-control mb-3"
              name="date"
              value={attendance.date}
              onChange={handleChange}
              required
            />

            <select
              className="form-control mb-3"
              name="status"
              value={attendance.status}
              onChange={handleChange}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

            <button className="btn btn-success">
              Add Attendance
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default AddAttendance;