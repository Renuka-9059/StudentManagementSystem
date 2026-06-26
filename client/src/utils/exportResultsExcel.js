import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportResultsExcel = (results) => {
  const data = results.map((item) => ({
    "Student Name": item.studentName,
    Course: item.course,
    Marks: item.marks,
    Grade: item.grade,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Results_Report.xlsx");
};

export default exportResultsExcel;