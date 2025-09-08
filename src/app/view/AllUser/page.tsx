// app/view/AllUser/page.tsx
import { getAllUser, UserRecord } from "@/api/alluser"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getCookie} from 'cookies-next/server';
import { UserRound } from "lucide-react";
import { cookies } from 'next/headers';
import Link from "next/link";
export default async function AllUserPage() {
  // Fetch data on the server
  const token = await getCookie('login-token', { cookies });
  const response = await getAllUser(1, 100,token as string)
  const data: UserRecord[] = response?.data || []

  console.log(UserRound);

  return (
    <div className="w-full m-4">
      <h1 className="font-bold mb-2">User Attendance List</h1>
      <Table className="border border-gray-300 w-full">
        <TableHeader className="bg-white">
          <TableRow className="border border-gray-300">
            <TableHead className="border border-gray-300 text-center">Name</TableHead>
            <TableHead className="border border-gray-300 text-center">Email</TableHead>
            <TableHead className="border border-gray-300 text-center">Role</TableHead>
            <TableHead className="border border-gray-300 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((user) => (
              <TableRow key={user.id} className="border border-gray-300">
                <TableCell className="border border-gray-300">{user.name}</TableCell>
                <TableCell className="border border-gray-300">{user.email}</TableCell>
                <TableCell className="border border-gray-300">{user.role}</TableCell>
                <TableCell className="border border-gray-300"><Link href={`/view/AllUser/Attendance/${user.id}`}><Button>Attendance</Button></Link></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="border border-gray-300">
              <TableCell colSpan={3} className="h-24 text-center border border-gray-300">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
