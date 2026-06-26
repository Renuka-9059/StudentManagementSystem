import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import exportAttendancePDF from "../utils/exportAttendancePDF";
import exportAttendanceExcel from "../utils/exportAttendanceExcel";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await API.get("/attendance");
      setAttendance(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/attendance/${id}`);
      alert("Attendance Deleted Successfully");
      fetchAttendance();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const filteredAttendance = attendance.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      (item.studentName || "").toLowerCase().includes(keyword) ||
      (item.course || "").toLowerCase().includes(keyword) ||
      (item.status || "").toLowerCase().includes(keyword) ||
      (item.date || "").toLowerCase().includes(keyword)
    );
  });

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="container mt-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2>Attendance Management</h2>

            <div className="d-flex align-items-center">

              <input
                type="text"
                className="form-control me-2"
                style={{ width: "250px" }}
                placeholder="Search Attendance..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="btn btn-success me-2"
                onClick={() => exportAttendancePDF(filteredAttendance)}
              >
                Export PDF
              </button>

              <button
                className="btn btn-info me-2"
                onClick={() => exportAttendanceExcel(filteredAttendance)}
              >
                Export Excel
              </button>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/add-attendance")}
              >
                Add Attendance
              </button>

            </div>

          </div>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Date</th>
                <th>Status</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((item) => (
                  <tr key={item._id}>
                    <td>{item.studentName}</td>
                    <td>{item.course}</td>
                    <td>{item.date}</td>

                    <td>
                      <span
                        className={
                          item.status === "Present"
                            ? "badge bg-success"
                            : "badge bg-danger"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          navigate(`/edit-attendance/${item._id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Attendance Records Found
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

export default Attendance;