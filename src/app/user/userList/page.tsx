import { GetUserList } from "@/api/auth"
import { getCookie, getCookies, hasCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';
// import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type User = {
  name: string
  role: string
  email: string

}

const Page = async () => {
 const token = await getCookie('login-token', { cookies });
  const response = await GetUserList(token as string)
  const users: User[] = response?.users || [] // Adjust depending on API response shape

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold mb-4">User List</h1>
       <Link href="/user/createUser" className="text-sm text-blue-950 hover:underline"><Button variant='outline'>Back</Button></Link>
      </div>
      
      <Table className="border-r-blue-50">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[150px]">Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y border-gray-100">
          {users.length > 0 ? (
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                 <TableCell className="space-x-4">
                  <Link href='/user/role'><Button variant="link" className="p-0"> Access</Button></Link>
                  <Link href=''><Button variant="link" className="p-0 text-red-600">Delete</Button></Link>
                 </TableCell>
                
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Page
