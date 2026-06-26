import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EditAttendance() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [attendance, setAttendance] = useState({
    studentName: "",
    course: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await API.get(`/attendance/${id}`);
      setAttendance(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/attendance/${id}`, attendance);
      alert("Attendance Updated Successfully");
      navigate("/attendance");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="container mt-4">
          <h2>Edit Attendance</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              className="form-control mb-3"
              name="studentName"
              value={attendance.studentName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control mb-3"
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
              Update Attendance
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default EditAttendance;