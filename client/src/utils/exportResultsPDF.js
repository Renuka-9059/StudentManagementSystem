import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportResultsPDF = (results) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Results Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Student Name", "Course", "Marks", "Grade"]],
    body: results.map((item) => [
      item.studentName,
      item.course,
      item.marks,
      item.grade,
    ]),
  });

  doc.save("Results_Report.pdf");
};

export default exportResultsPDF;