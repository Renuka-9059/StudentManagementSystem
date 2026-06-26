import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    course: "",
    attendance: "",
    marks: "",
  });

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await API.get(`/students/${id}`);
      setStudent(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/students/${id}`, student);
      alert("Student Updated Successfully");
      navigate("/students");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="container mt-4">
          <h2>Edit Student</h2>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              name="name"
              value={student.name}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="email"
              value={student.email}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="phone"
              value={student.phone}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="gender"
              value={student.gender}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="course"
              value={student.course}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="attendance"
              value={student.attendance}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="marks"
              value={student.marks}
              onChange={handleChange}
            />

            <button className="btn btn-success">
              Update Student
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default EditStudent;