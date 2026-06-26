import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportAttendancePDF = (attendance) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Attendance Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Student", "Course", "Date", "Status"]],
    body: attendance.map((item) => [
      item.studentName,
      item.course,
      item.date,
      item.status,
    ]),
  });

  doc.save("Attendance_Report.pdf");
};

export default exportAttendancePDF;