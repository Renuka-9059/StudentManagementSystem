import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportStudentsExcel = (students) => {
  const data = students.map((student) => ({
    Name: student.name,
    Email: student.email,
    Phone: student.phone,
    Gender: student.gender,
    Course: student.course,
    Attendance: student.attendance + "%",
    Marks: student.marks,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Students_Report.xlsx");
};

export default exportStudentsExcel;