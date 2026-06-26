import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddStudent() {

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    course: "",
    attendance: "",
    marks: ""
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/students", student);
      alert("Student Added Successfully");
      navigate("/students");
    } catch (error) {
      console.log(error);
      alert("Failed to Add Student");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="container mt-4">

          <h2>Add Student</h2>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              placeholder="Student Name"
              name="name"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
            />

            <select
              className="form-control mb-3"
              name="gender"
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              className="form-control mb-3"
              placeholder="Course"
              name="course"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              placeholder="Attendance"
              name="attendance"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              placeholder="Marks"
              name="marks"
              onChange={handleChange}
            />

            <button className="btn btn-success">
              Add Student
            </button>

          </form>

        </div>
      </div>
    </>
  );
}

export default AddStudent;