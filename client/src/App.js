import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import Attendance from "./pages/Attendance";
import AddAttendance from "./pages/AddAttendance";
import EditAttendance from "./pages/EditAttendance";
import Results from "./pages/Results";
import AddResult from "./pages/AddResult";
import EditResult from "./pages/EditResult";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course/:id" element={<EditCourse />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/add-attendance" element={<AddAttendance />} />
        <Route path="/edit-attendance/:id" element={<EditAttendance />} />
        <Route path="/results" element={<Results />} />
        <Route path="/add-result" element={<AddResult />} />
        <Route path="/edit-result/:id" element={<EditResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;