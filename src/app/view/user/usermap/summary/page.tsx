import { GetListUserAssign } from "@/api/alluser";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
// Single assigned user (from User table)
type AssignUser = {
  id: string;
  name: string;
  role: string;
};

// Join table entry (AssignUserMaping)
type AssignUserMapping = {
  id: string;
  userMapingId: string;
  assignUserId: string;
  AssignUser: AssignUser;
};

// User mapping response
type UserMapping = {
  id: string; // maps to UserMapingAutoID
  AssignedToID: string;
  CreatedByID: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  AssignUsers: AssignUserMapping[];
};

type users={
    name:string;
    id:string;
    role:string;
}
const Page = async () => {
  const token = await getCookie("login-token", { cookies });
  const response = await GetListUserAssign(token as string);

  // Expecting API to return { list: UserMapping[] }
  const mappings: UserMapping[] = response?.list || [];
  const users:users=response?.user
    console.log(users)
  console.log("Mappings:", mappings[0]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold mb-4">Team List</h1>
        
      </div>
      <Card className="flex flex-row items-center space-x-2 p-4">
        <p>
            <strong>Name  -</strong> {users.name}
          </p>
          <p>
            <strong>Role  -</strong> {users.role}
          </p>
          <Link href={`/view/user/usermap/summary/${users.id}`}><Button > Task View</Button></Link>
      </Card>

     
         <div className="mb-4">
          

          <Table className="border-r-blue-50 mt-2">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[200px] border-2 border-gray-300 text-start">
                  Name
                </TableHead>
                <TableHead className="w-[150px] border-2 border-gray-300 text-start">
                  Role
                </TableHead>
                <TableHead className="border-2 border-gray-300 text-start">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y border-gray-100">
              {mappings[0]?.AssignUsers.length > 0 ? (
                mappings[0].AssignUsers.map((au) => (
                  <TableRow key={au.id}>
                    <TableCell className="font-medium border-2 border-gray-100 text-start">
                      {au.AssignUser.name}
                    </TableCell>
                    <TableCell className="border-2 border-gray-100 text-start">
                      {au.AssignUser.role}
                    </TableCell>
                    <TableCell className="space-x-4 border-2 border-gray-100 text-start">
                      
                      <Link href={`/view/user/details/${au.AssignUser.id}`}>
                        <Button variant="link" className="p-0">
                          View
                        </Button>
                      </Link>
                      
                      
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-gray-500"
                  >
                    No assigned users
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      
    </div> 
  );
};

export default Page;
