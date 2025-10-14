"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { UserAttendanceRecord } from "@/api/attendance";
import { Button } from "@/components/ui/button";

interface ExportToExcelAttendancesProps {
  records: UserAttendanceRecord[];
}

const ExportToExcelAttendances: React.FC<ExportToExcelAttendancesProps> = ({ records }) => {
  const [loading, setLoading] = useState(false);

  const handleExportToExcel = async (title = "Attendance_Report", worksheetName = "Attendance") => {
    try {
      setLoading(true);

      if (!records || records.length === 0) {
        console.warn("No attendance records available for export.");
        setLoading(false);
        return;
      }

      // ✅ Convert your attendance records to exportable JSON
      const dataToExport = records.map((rec, index) => ({
        "S.No": index + 1,
        "Punch In Time": rec.PunchInAt
          ? new Date(Number(rec.PunchInAt)).toLocaleString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })
          : "--",
        "Punch Out Time": rec.PunchOutAt
          ? new Date(Number(rec.PunchOutAt)).toLocaleString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })
          : "--",
        "Punch In Location": rec.PunchInLocation || "--",
        "Punch Out Location": rec.punchOutLocation || "--",
        Status: rec.status || "--",
      }));

    //     const headerRows = [
    //     { A: `Name: ${userName || "Unknown User"}` },
    //     { A: `Date: ${today}` },
    //     {}, // empty row for spacing
    //   ];


       const worksheetData = [
        // ...headerRows,
        ...XLSX.utils.sheet_to_json(XLSX.utils.json_to_sheet(dataToExport), { header: 1 }),
      ];
      // ✅ Create Excel workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);

      // ✅ Save file
      XLSX.writeFile(workbook, `${title}.xlsx`);

    //   console.log(`✅ Exported data to ${title}.xlsx`);
    } catch (error: any) {
    //   console.error("❌ Export Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="default"
      disabled={loading}
      onClick={() => handleExportToExcel("Attendance_Report", "Attendance")}
    >
      {loading ? "Exporting..." : "Excel"}
    </Button>
  );
};

export default ExportToExcelAttendances;
