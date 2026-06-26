import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportStudentsPDF = (students) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Student Management System", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [[
      "Name",
      "Email",
      "Phone",
      "Course",
      "Attendance",
      "Marks",
    ]],
    body: students.map((student) => [
      student.name,
      student.email,
      student.phone,
      student.course,
      student.attendance + "%",
      student.marks,
    ]),
  });

  doc.save("Students_Report.pdf");
};

export default exportStudentsPDF;