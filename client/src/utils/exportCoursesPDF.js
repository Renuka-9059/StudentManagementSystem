import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportCoursesPDF = (courses) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Course Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [[
      "Course Name",
      "Course Code",
      "Duration",
      "Faculty",
    ]],
    body: courses.map((course) => [
      course.courseName,
      course.courseCode,
      course.duration,
      course.faculty,
    ]),
  });

  doc.save("Courses_Report.pdf");
};

export default exportCoursesPDF;