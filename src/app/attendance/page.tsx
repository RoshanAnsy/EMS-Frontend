"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { getAttendanceSummary } from "@/api/attendance"
import { AttendanceApiResponse } from "@/api/attendance"

export default function AttendanceSystem() {
  const [attendance, setAttendance] = useState({
    isClockedIn: false,
    lastPunchTime: null as string | null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [attendanceData, setAttendanceData] = useState<AttendanceApiResponse | null>(null)
  const [isSummaryLoading, setIsSummaryLoading] = useState(false)

  const handlePunch = async (type: "in" | "out") => {
    setIsLoading(true)
    try {
      // 👇 baad me punch API se replace karo
      await new Promise(resolve => setTimeout(resolve, 1000))

      setAttendance({
        isClockedIn: type === "in",
        lastPunchTime: new Date().toISOString()
      })

      toast.success(`Punched ${type} successfully!`, {
        description: `Time: ${new Date().toLocaleTimeString()}`
      })
    } catch (error) {
      toast.error("Failed to record attendance")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSummary = async () => {
    setIsSummaryLoading(true)
    try {
      const res = await getAttendanceSummary(1, 5, "2025-08-24", "2025-08-27")
      setAttendanceData(res)
    } catch (err) {
      toast.error("Failed to fetch summary")
    } finally {
      setIsSummaryLoading(false)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        
        {/* Left Side - Punch In/Out */}
        <Card className="w-full shadow-2xl rounded-2xl border border-gray-200 flex flex-col items-center justify-center p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-indigo-700">Attendance</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              {attendance.isClockedIn
                ? "You're currently clocked in"
                : "Clock in to start your day"}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-6">
            {attendance.isClockedIn ? (
              <Button
                onClick={() => handlePunch("out")}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold w-40 h-40 rounded-full text-2xl shadow-lg hover:scale-105 transition-all"
              >
                {isLoading ? "Processing..." : "Punch Out"}
              </Button>
            ) : (
              <Button
                onClick={() => handlePunch("in")}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold w-40 h-40 rounded-full text-2xl shadow-lg hover:scale-105 transition-all"
              >
                {isLoading ? "Processing..." : "Punch In"}
              </Button>
            )}

            {attendance.lastPunchTime && (
              <p className="text-sm text-gray-500 text-center">
                Last punch:{" "}
                <span className="font-medium text-gray-700">
                  {new Date(attendance.lastPunchTime).toLocaleString()}
                </span>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Right Side - Attendance Summary */}
        <div className="w-full space-y-4">
          <h2 className="text-xl font-semibold text-indigo-700 text-center md:text-left">
            Attendance Summary
          </h2>

          {isSummaryLoading && <p className="p-4 text-center">Loading...</p>}

          {!isSummaryLoading && attendanceData && (
            <div className="space-y-4">
              {Object.entries(attendanceData.data).map(([date, records]) => (
                <Card key={date} className="rounded-lg shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold text-indigo-600">{date}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-700">
                    {records.map((rec, idx) => (
                      <div key={idx} className="border-t pt-2">
                        <p>
                          <span className="font-medium">In:</span> {rec.punchInTime} (
                          {rec.PunchInLocation})
                        </p>
                        <p>
                          <span className="font-medium">Out:</span> {rec.punchOutTime} (
                          {rec.punchOutLocation})
                        </p>
                        <p className="text-green-600 font-semibold">{rec.status}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
