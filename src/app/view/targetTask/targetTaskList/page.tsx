import { GetTargetTaskList } from '@/api/task';
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
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GetDate } from '@/utils/getLocation/GetLocalTime';

type Task = {
  TargetTaskID: string;
  TaskType: string;
  TaskStartedAt: string;
  TaskCompletedAt: string;
  TotalUnits: number;
  TotalAmountTarget: number;
  remark: string | null;
  createdAt: string;
  assignee: {
    id: string;
    name: string;
  };
};

const Page = async () => {
  const token = await getCookie('login-token', { cookies });
  const response = await GetTargetTaskList(token as string);
  const tasks: Task[] = response?.TaskList || [];

  console.log("this is list of task that created", tasks);

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold mb-4">Target Task List</h1>
        <Link
          href="/view/targetTask/createTargetTask"
          className="text-sm text-blue-950 hover:underline"
        >
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table className="border-r-blue-50 min-w-[700px] border">
          <TableHeader className="bg-gray-100">
            <TableRow>
              {/* <TableHead className="w-[200px] border-2 border-gray-300 text-start">Task ID</TableHead> */}
              <TableHead className="w-[200px] border-2 border-gray-300 text-start">Task Type</TableHead>
              <TableHead className="w-[200px] border-2 border-gray-300 text-start">Total Units (KW)</TableHead>
              <TableHead className="w-[200px] border-2 border-gray-300 text-start">Total Amount Target</TableHead>
              <TableHead className="w-[200px] border-2 border-gray-300 text-start">Assignee</TableHead>
              <TableHead className="border-2 border-gray-300 text-start">Remark</TableHead>
              <TableHead className="w-[200px] border-2 border-gray-300 text-start">Task Started At</TableHead>
              <TableHead className="w-[200px] border-2 border-gray-300 text-start">Task Completed At</TableHead>
              <TableHead className="border-2 border-gray-300 text-start">Created At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y border-gray-100">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task.TargetTaskID}>
                  {/* <TableCell className="font-medium border-2 border-gray-100 text-start">
                    {task.TargetTaskID}
                  </TableCell> */}
                  <TableCell className="border-2 border-gray-100 text-start">
                    {task.TaskType}
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    {task.TotalUnits}
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    {task.TotalAmountTarget}
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    {task.assignee?.name || "Unassigned"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    {task.remark || "-"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    <GetDate punchInAt={task.TaskStartedAt} />
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    <GetDate punchInAt={task.TaskCompletedAt} />
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    <GetDate punchInAt={task.createdAt} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-gray-500">
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
