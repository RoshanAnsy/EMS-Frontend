import React from "react"
import { Button } from "@/components/ui/button"
import GetLocalTime from "@/utils/getLocation/GetLocalTime"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCookie } from "cookies-next/server"
import { cookies } from "next/headers"
import { getUserAttendance, UserAttendanceRecord } from "@/api/attendance"
import Link from "next/link"
interface PageProps{
  params:Promise<{ userId: string }>;
}
// ✅ Don't redeclare PageProps, use destructuring directly
export default async function Page({params}: PageProps) {

  const { userId } =await params;
  const idDecoded = decodeURIComponent(userId);
  // const ApiResponse=await GetArticle(idDecoded);
  // console.log("from this is", params.userId)

  const token = await getCookie("login-token", { cookies })

  const res = await getUserAttendance( idDecoded, token as string)

  console.log("attendance api response:", res)

  const records: UserAttendanceRecord[] = res?.attendance

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance Summary</h1>
        <Link href="/view/AllUser">
          <Button variant="outline">Back to Users</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[700px] border border-gray-300">
          <TableHeader className="bg-white">
            <TableRow>
              <TableHead className="border border-gray-300 text-center">
                PunchIn Time
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                PunchOut Time
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                PunchIn Location
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                PunchOut Location
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length ? (
              records.map((rec, i) => (
                <TableRow key={i}>
                  <TableCell className="border-2 border-gray-100 text-start">
                    <GetLocalTime punchInAt={rec?.PunchInAt} />

                    
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    {rec?.PunchOutAt
                      ? new Date(Number(rec.PunchOutAt)).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })
                      : "--"}


                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    {rec?.PunchInLocation}
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    {rec?.punchOutLocation}
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    {rec?.status}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center border border-gray-100"
                >
                  No Records Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
