import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportAttendanceExcel = (attendance) => {
  const data = attendance.map((item) => ({
    Student: item.studentName,
    Course: item.course,
    Date: item.date,
    Status: item.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Attendance_Report.xlsx");
};

export default exportAttendanceExcel;