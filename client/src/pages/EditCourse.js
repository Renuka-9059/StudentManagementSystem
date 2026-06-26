import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    courseName: "",
    courseCode: "",
    duration: "",
    faculty: "",
  });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await API.get(`/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/courses/${id}`, course);
      alert("Course Updated Successfully");
      navigate("/courses");
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
          <h2>Edit Course</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              className="form-control mb-3"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              placeholder="Course Name"
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              name="courseCode"
              value={course.courseCode}
              onChange={handleChange}
              placeholder="Course Code"
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              placeholder="Duration"
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              name="faculty"
              value={course.faculty}
              onChange={handleChange}
              placeholder="Faculty"
              required
            />

            <button className="btn btn-success">
              Update Course
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default EditCourse;