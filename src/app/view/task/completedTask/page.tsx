// import { GetTaskList } from '@/api/task';
import { getCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
import { GetCompletedTasksList } from '@/api/task';
// import { GetInprogressTasksList } from '@/api/task';
import { GetDate } from '@/utils/getLocation/GetLocalTime';
type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: {
    id: string;
    name: string;
  };
  assigner: {
    id: string;
    name: string;
  };
  createdAt: string;
  pinCode: string;
  city: string;
  state: string;
  MobileNo: string;
  address: string;
  TotalProjectCost: string;
  companyName: string;
  clientName: string;
};

const Page = async () => {
  const token = await getCookie('login-token', { cookies });
  const response = await GetCompletedTasksList(token as string);
  const tasks: Task[] = response?.TaskList || [];

  console.log("this is list of task that created", tasks);

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold mb-4">Completed Task List</h1>
        {/* <Link href="/view/user/createUser" className="text-sm text-blue-950 hover:underline">
          <Button variant="outline">Back</Button>
        </Link> */}
      </div>
      <div className="overflow-x-auto">
      <Table className="border-r-blue-50 min-w-[700px] border">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[200px] border-2 border-gray-300 text-start">Company Name</TableHead>
            <TableHead className="w-[200px] border-2 border-gray-300 text-start">Project Name</TableHead>
            <TableHead className="w-[200px] border-2 border-gray-300 text-start">Total Project Cost</TableHead>
            <TableHead className="border-2 border-gray-300 text-start">Employee Name</TableHead>
            <TableHead className="border-2 border-gray-300 text-start">Client Name</TableHead>
            <TableHead className="w-[200px] border-2 border-gray-300 text-start">Mobile No.</TableHead>
            <TableHead className="w-[150px] border-2 border-gray-300 text-start">State</TableHead>
            <TableHead className="border-2 border-gray-300 text-start">City</TableHead>
            <TableHead className="border-2 border-gray-300 text-start">Pin Code</TableHead>
            <TableHead className="w-[200px] border-2 border-gray-300 text-start">Status</TableHead>
            <TableHead className="w-[150px] border-2 border-gray-300 text-start">Task Created By</TableHead>
            <TableHead className="border-2 border-gray-300 text-start">Created At</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y border-gray-100">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium border-2 border-gray-100 text-start">{task.companyName}</TableCell>
                <TableCell className="font-medium border-2 border-gray-100 text-start">{task.title}</TableCell>
                <TableCell className="font-medium border-2 border-gray-100 text-start">{task.TotalProjectCost}</TableCell>
                <TableCell className="border-2 border-gray-100 text-start">{task.assignee?.name || "Unassigned"}</TableCell>
                <TableCell className="font-medium border-2 border-gray-100 text-start">{task.clientName}</TableCell>
                <TableCell className="border-2 border-gray-100 text-start">{task.MobileNo}</TableCell>
                <TableCell className="border-2 border-gray-100 text-start">{task.state}</TableCell>
                <TableCell className="font-medium border-2 border-gray-100 text-start">{task.city}</TableCell>
                <TableCell className="border-2 border-gray-100 text-start">{task.pinCode}</TableCell>
                <TableCell className="font-medium border-2 border-gray-100 text-start">{task.status}</TableCell>
                 <TableCell className="border-2 border-gray-100 text-start">{task.assigner?.name || "Unassigned"}</TableCell>
                <TableCell className="border-2 border-gray-100 text-start"><GetDate punchInAt={task.createdAt}/> </TableCell>
                {/* <TableCell className="border-2 border-gray-100 text-start">{task.state}</TableCell> */}
                {/* <TableCell className="space-x-4 border-2 border-gray-100 text-start">
                  <Link href={`/view/task/details/${task.id}`}><Button variant="link" className="p-0">View</Button></Link>
                  <Link href={`/view/task/update/${task.id}`}><Button variant="link" className="p-0">Update</Button></Link>
                  <Button variant="link" className="p-0 text-red-600">Delete</Button>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No tasks found
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
