import { GetTeamListAssign } from "@/api/alluser";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
interface PageProps{
  params:Promise<{ id: string }>;
}


type TeamLeadTaskCompletedType={
  _count:{_all:number},
  _sum:{TotalProjectCost:number, TotalReceivedAmount:number}

}


interface FinalReportItemType {
  id: string;
  name: string;
  role: string;
  MobileNo: string | null;
  EmplyID: string;
  email: string;
  completedTaskCount: number;
  totalProjectCost: number;
  totalReceivedAmount: number;
}

const Page = async ({params}: PageProps) => {
       const { id } =await params;
  const idDecoded = decodeURIComponent(id);
  const token = await getCookie("login-token", { cookies });
  const currentDate = new Date();

  // 🏁 Get the first day of the current month
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  // ⏳ End date = current date
  const endOfMonth = currentDate;
  const response = await GetTeamListAssign(idDecoded,startOfMonth,endOfMonth,token as string);

  const users:users=response?.user;
  const TeamLeadTaskCompleted:TeamLeadTaskCompletedType=response?.CompletedTaskAmountTeamLead
  const finalReport:FinalReportItemType[]=response?.finalReport;
  //   console.log(users)
  console.log("Mappings:", response);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold mb-4">Team Task Detail List</h1>
        
      </div>
     <Card className="p-4">
  <CardHeader>Total Task completed For current Month details</CardHeader>
  <CardContent>
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
        <span className="w-48 font-medium">Total Completed Project</span>
        <div className="flex items-baseline space-x-1">
          
          <strong>{response?.totalCompletedTasks ?? 0}</strong>
        </div>
      </div>
      <div className="flex items-center justify-between bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600">
        <span className="w-48 font-medium">Total Project Cost</span>
        <div className="flex items-baseline space-x-1">
          <span className="text-sm">₹</span>
          <strong>{response?.totalProjectCost ?? 0}</strong>
        </div>
      </div>
      <div className="flex items-center justify-between bg-purple-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-600">
        <span className="w-48 font-medium">Total Received Amount</span>
        <div className="flex items-baseline space-x-1">
          <span className="text-sm">₹</span>
          <strong>{response?.totalReceivedAmount ?? 0}</strong>
        </div>
      </div>
    </div>
  </CardContent>
</Card>



      

<Card className="p-4">
  <CardContent className="flex flex-row justify-between items-start space-x-12">
    {/* Left Column */}
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <span className="text-muted-foreground w-32">Name</span>
        <strong>{users?.name}</strong>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-muted-foreground w-32">Role</span>
        <strong>{users?.role}</strong>
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <span className="text-muted-foreground w-48">Total Completed Project</span>
        <strong>{TeamLeadTaskCompleted?._count?._all ?? 0}</strong>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-muted-foreground w-48">Total Project Cost</span>
        <strong>₹ {TeamLeadTaskCompleted?._sum?.TotalProjectCost ?? 0}</strong>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-muted-foreground w-48">Total Received Amount</span>
        <strong>₹ {TeamLeadTaskCompleted?._sum?.TotalReceivedAmount ?? 0}</strong>
      </div>
    </div>
  </CardContent>
</Card>


     
         <div className="mb-4">
      <Table className="border-r-blue-50 mt-2">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[200px] border-2 border-gray-300 text-start">Name</TableHead>
            <TableHead className="w-[150px] border-2 border-gray-300 text-start">Role</TableHead>
            <TableHead className="border-2 border-gray-300 text-start">Completed Tasks</TableHead>
            <TableHead className="border-2 border-gray-300 text-start">Total Project Cost (₹)</TableHead>
            <TableHead className="border-2 border-gray-300 text-start">Total Received Amount (₹)</TableHead>
            <TableHead className="border-2 border-gray-300 text-start">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y border-gray-100">
          {finalReport.length > 0 ? (
            finalReport.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium border-2 border-gray-100 text-start">{item.name}</TableCell>
                <TableCell className="border-2 border-gray-100 text-start">{item.role}</TableCell>
                <TableCell className="border-2 border-gray-100 text-start">{item.completedTaskCount}</TableCell>
                <TableCell className="border-2 border-gray-100 text-start">{item.totalProjectCost}</TableCell>
                <TableCell className="border-2 border-gray-100 text-start">{item.totalReceivedAmount}</TableCell>
                <TableCell className="space-x-4 border-2 border-gray-100 text-start">
                  <Link href={`/view/user/details/${item.id}`}>
                    <Button variant="link" className="p-0">View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
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
