import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardChart from "../components/DashboardChart";
import API from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    averageAttendance: 0,
    averageMarks: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await API.get("/students/stats/dashboard");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4 fw-bold">
            📊 Dashboard
          </h2>

          <div className="row">

            {/* Total Students */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dashboard-card students-card">
                <div>
                  <h6>Total Students</h6>
                  <h2>{stats.totalStudents}</h2>
                </div>

                <i className="fas fa-user-graduate dashboard-icon"></i>
              </div>
            </div>

            {/* Total Courses */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dashboard-card courses-card">
                <div>
                  <h6>Total Courses</h6>
                  <h2>{stats.totalCourses}</h2>
                </div>

                <i className="fas fa-book dashboard-icon"></i>
              </div>
            </div>

            {/* Attendance */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dashboard-card attendance-card">
                <div>
                  <h6>Average Attendance</h6>
                  <h2>{stats.averageAttendance}%</h2>
                </div>

                <i className="fas fa-calendar-check dashboard-icon"></i>
              </div>
            </div>

            {/* Marks */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="dashboard-card results-card">
                <div>
                  <h6>Average Marks</h6>
                  <h2>{stats.averageMarks}</h2>
                </div>

                <i className="fas fa-chart-line dashboard-icon"></i>
              </div>
            </div>

          </div>

          <div className="mt-5">
            <DashboardChart stats={stats} />
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;