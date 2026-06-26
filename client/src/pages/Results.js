import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import exportResultsPDF from "../utils/exportResultsPDF";
import exportResultsExcel from "../utils/exportResultsExcel";

function Results() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, []);

  // Fetch Results
  const fetchResults = async () => {
    try {
      const response = await API.get("/results");
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  // Delete Result
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/results/${id}`);
      alert("Result Deleted Successfully");
      fetchResults();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  // Search Filter
  const filteredResults = results.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      (item.studentName || "").toLowerCase().includes(keyword) ||
      (item.course || "").toLowerCase().includes(keyword) ||
      (item.grade || "").toLowerCase().includes(keyword) ||
      String(item.marks || "").includes(keyword)
    );
  });

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="container mt-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2>Results Management</h2>

            <div className="d-flex align-items-center">

              <input
                type="text"
                className="form-control me-2"
                style={{ width: "250px" }}
                placeholder="Search Results..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="btn btn-success me-2"
                onClick={() => exportResultsPDF(filteredResults)}
              >
                Export PDF
              </button>

              <button
                className="btn btn-info me-2"
                onClick={() => exportResultsExcel(filteredResults)}
              >
                Export Excel
              </button>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/add-result")}
              >
                Add Result
              </button>

            </div>

          </div>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Marks</th>
                <th>Grade</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <tr key={item._id}>
                    <td>{item.studentName}</td>
                    <td>{item.course}</td>
                    <td>{item.marks}</td>
                    <td>{item.grade}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => navigate(`/edit-result/${item._id}`)}
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
                    No Results Found
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

export default Results;