import { GetUserList } from "@/api/auth"
import { getCookie} from 'cookies-next/server';
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
// import { DeleteUser } from "@/api/auth";
// import { toast } from "sonner";
import DeleteUserComponent from "@/components/user/DeleteUserComponent";
type User = {
  name: string
  role: string
  email: string
  id: string

}

const Page = async () => {
 const token = await getCookie('login-token', { cookies });
  const response = await GetUserList(token as string)
  const users: User[] = response?.users || []
  
  // Adjust depending on API response shape

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold mb-4">User List</h1>
       <Link href="/view/user/createUser" className="text-sm text-blue-950 hover:underline"><Button variant='outline'>Back</Button></Link>
      </div>
      
      <Table className="border-r-blue-50">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[200px] border-2 border-gray-300 text-start">Name</TableHead>
            <TableHead className="w-[150px] border-2 border-gray-300 text-start">Role</TableHead>
            <TableHead className="border-2 border-gray-300 text-start">Email</TableHead>
            <TableHead className="border-2 border-gray-300 text-start">Action</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y border-gray-100">
          {users.length > 0 ? (
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium border-2 border-gray-100 text-start">{user.name}</TableCell>
                <TableCell className="border-2 border-gray-100 text-start">{user.role}</TableCell>
                <TableCell className="border-2 border-gray-100 text-start">{user.email}</TableCell>
                 <TableCell className="space-x-4 border-2 border-gray-100 text-start">
                  <Link href={'/view/user/role'}><Button variant="link" className="p-0"> Access</Button></Link>
                  <Link href={`/view/user/remove/${user.id}`}><Button variant="link" className="p-0"> Remove Access</Button></Link>
                  <Link href={`/view/user/details/${user.id}`}><Button variant="link" className="p-0"> View</Button></Link>
                  <Link href={`/view/user/update/${user.id}`}><Button variant="link" className="p-0"> Update</Button></Link>
                  <Link href={`/view/pay/${user.id}`}><Button variant="link" className="p-0"> Pay</Button></Link>
                  <Link href={`/view/user/usermap/summary/${user.id}`}><Button variant="link" className="p-0"> Team</Button></Link>
                  <Link href=''>
                 
                  <DeleteUserComponent id={user.id}/>
                  </Link>
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
