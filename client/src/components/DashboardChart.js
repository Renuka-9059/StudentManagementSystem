import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ stats }) {
  const data = {
    labels: [
      "Students",
      "Courses",
      "Attendance",
      "Marks",
    ],

    datasets: [
      {
        label: "Student Management System",
        data: [
          stats.totalStudents,
          stats.totalCourses,
          stats.averageAttendance,
          stats.averageMarks,
        ],

        backgroundColor: [
          "#4e73df", // Blue
          "#1cc88a", // Green
          "#f6c23e", // Yellow
          "#e74a3b", // Red
        ],

        borderColor: [
          "#2e59d9",
          "#17a673",
          "#dda20a",
          "#c0392b",
        ],

        borderWidth: 2,
        borderRadius: 12,
        hoverBackgroundColor: [
          "#224abe",
          "#13855c",
          "#f4b619",
          "#be2617",
        ],
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "#333",
          font: {
            size: 15,
            weight: "bold",
          },
        },
      },

      title: {
        display: true,
        text: "Student Management System Statistics",
        color: "#222",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          color: "#444",
        },

        grid: {
          color: "#e5e5e5",
        },
      },

      x: {
        ticks: {
          color: "#444",
          font: {
            size: 14,
            weight: "bold",
          },
        },

        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      className="mt-5"
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default DashboardChart;