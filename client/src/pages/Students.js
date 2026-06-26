import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import exportStudentsPDF from "../utils/exportStudentsPDF";
import exportStudentsExcel from "../utils/exportStudentsExcel";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await API.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/students/${id}`);
      alert("Student Deleted Successfully");
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  // Search Filter
  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="container mt-4">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Student List</h2>

            <div>
  <button
    className="btn btn-success me-2"
    onClick={() => exportStudentsPDF(filteredStudents)}
  >
    Export PDF
  </button>

  <button
    className="btn btn-info me-2"
    onClick={() => exportStudentsExcel(filteredStudents)}
  >
    Export Excel
  </button>

  <Link to="/add-student" className="btn btn-primary">
    Add Student
  </Link>
</div>
          </div>

          {/* Search Box */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by Name or Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Attendance</th>
                <th>Marks</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.gender}</td>
                    <td>{student.course}</td>
                    <td>{student.attendance}%</td>
                    <td>{student.marks}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(student._id)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(student._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-danger">
                    No Students Found
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

export default Students;