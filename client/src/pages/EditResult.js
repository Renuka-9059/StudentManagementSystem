import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function EditResult() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [result, setResult] = useState({
    studentName: "",
    course: "",
    marks: "",
    grade: "",
  });

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      const response = await API.get(`/results/${id}`);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to Load Result");
    }
  };

  const handleChange = (e) => {
    setResult({
      ...result,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/results/${id}`, result);
      alert("Result Updated Successfully");
      navigate("/results");
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
          <h2>Edit Result</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              className="form-control mb-3"
              name="studentName"
              value={result.studentName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              name="course"
              value={result.course}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              className="form-control mb-3"
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
              Update Result
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default EditResult;