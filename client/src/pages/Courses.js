import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import exportCoursesPDF from "../utils/exportCoursesPDF";
import exportCoursesExcel from "../utils/exportCoursesExcel";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch Courses
  const fetchCourses = async () => {
    try {
      const response = await API.get("/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Delete Course
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/courses/${id}`);
      alert("Course Deleted Successfully");
      fetchCourses();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  // Search Filter
  const filteredCourses = courses.filter((course) => {
    const keyword = search.toLowerCase();

    return (
      (course.courseName || "").toLowerCase().includes(keyword) ||
      (course.courseCode || "").toLowerCase().includes(keyword) ||
      (course.duration || "").toLowerCase().includes(keyword) ||
      (course.faculty || "").toLowerCase().includes(keyword)
    );
  });

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="container mt-4">

          {/* Heading */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Course Management</h2>

            <div className="d-flex">

              <input
                type="text"
                className="form-control me-2"
                style={{ width: "250px" }}
                placeholder="Search Course..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="btn btn-success me-2"
                onClick={() => exportCoursesPDF(filteredCourses)}
              >
                Export PDF
              </button>

              <button
                className="btn btn-info me-2"
                onClick={() => exportCoursesExcel(filteredCourses)}
              >
                Export Excel
              </button>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/add-course")}
              >
                Add Course
              </button>

            </div>
          </div>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Duration</th>
                <th>Faculty</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.courseName}</td>
                    <td>{course.courseCode}</td>
                    <td>{course.duration}</td>
                    <td>{course.faculty}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => navigate(`/edit-course/${course._id}`)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(course._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-danger">
                    No Courses Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </div>
    </>
  );
}

export default Courses;