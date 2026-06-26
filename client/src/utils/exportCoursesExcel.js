import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportCoursesExcel = (courses) => {
  const data = courses.map((course) => ({
    "Course Name": course.courseName,
    "Course Code": course.courseCode,
    Duration: course.duration,
    Faculty: course.faculty,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Courses_Report.xlsx");
};

export default exportCoursesExcel;