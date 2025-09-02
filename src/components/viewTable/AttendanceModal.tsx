"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getUserAttendance, UserAttendanceRecord } from "@/api/attendance"


export default function AttendanceView({
  userId,
  onBack,
}: {
  userId: string
  onBack: () => void
}) {
  const [attendance, setAttendance] = useState<UserAttendanceRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await getUserAttendance(1, 5, userId) // page=1, limit=5
        console.log("attendance api response:", res)

        // res.data is keyed by date, flatten karna hoga
        const records: UserAttendanceRecord[] = Object.values(res.data).flat()
        setAttendance(records)
      } catch (err) {
        console.error("Error fetching attendance:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAttendance()
  }, [userId])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance Summary</h1>
        <Button variant="outline" onClick={onBack}>
          Back to Users
        </Button>
      </div>

      {isLoading ? (
        <p className="text-center py-4">Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PunchIn Time</TableHead>
              <TableHead>PunchOut Time</TableHead>
              <TableHead>PunchIn Location</TableHead>
              <TableHead>PunchOut Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.length ? (
              attendance.map((rec, i) => (
                <TableRow key={i}>
                  <TableCell>{rec.PunchInTime}</TableCell>
                  <TableCell>{rec.PunchOutTime ?? "Not yet"}</TableCell>
                  <TableCell>{rec.PunchInLocation}</TableCell>
                  <TableCell>{rec.punchOutLocation ?? "Not yet"}</TableCell>
                  <TableCell>{rec.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No Records Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
