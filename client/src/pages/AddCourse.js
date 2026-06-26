import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AddCourse() {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    courseName: "",
    courseCode: "",
    duration: "",
    faculty: "",
  });

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/courses", course);
      alert("Course Added Successfully");
      navigate("/courses");
    } catch (error) {
  console.error(error);

  if (error.response) {
    alert(error.response.data.message);
  } else {
    alert("Server Error");
  }

    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="container mt-4">
          <h2>Add Course</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Course Name"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Course Code"
              name="courseCode"
              value={course.courseCode}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Duration"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Faculty"
              name="faculty"
              value={course.faculty}
              onChange={handleChange}
              required
            />

            <button className="btn btn-success">
              Add Course
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default AddCourse;