import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function AddResult() {
  const navigate = useNavigate();

  const [result, setResult] = useState({
    studentName: "",
    course: "",
    marks: "",
    grade: "",
  });

  const handleChange = (e) => {
    setResult({
      ...result,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/results", result);
      alert("Result Added Successfully");
      navigate("/results");
    } catch (error) {
      console.error(error);
      alert("Failed to Add Result");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="container mt-4">
          <h2>Add Result</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Student Name"
              name="studentName"
              value={result.studentName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Course"
              name="course"
              value={result.course}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Marks"
              name="marks"
              value={result.marks}
              onChange={handleChange}
              required
            />

            <select
              className="form-control mb-3"
              name="grade"
              value={result.grade}
              onChange={handleChange}
              required
            >
              <option value="">Select Grade</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>

            <button className="btn btn-success">
              Add Result
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default AddResult;