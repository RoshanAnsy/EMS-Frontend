import React from 'react'
import { getCookie } from "cookies-next/server"
import { cookies } from "next/headers"

import { GetCompletedTaskDetails } from '@/api/task'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GetDate } from '@/utils/getLocation/GetLocalTime';

interface PageProps{
  params: Promise<{ taskId: string }>;
}

const page = async ({ params }: PageProps) => {
  const { taskId } = await params;
  const idDecoded = decodeURIComponent(taskId);
  const token = await getCookie("login-token", { cookies });
  const res = await GetCompletedTaskDetails(token as string, idDecoded);

  if (!res?.TaskDetails) {
    return <div className="m-4 text-red-500">Task details not found</div>;
  }

  const task = res.TaskDetails;

  return (
    <main className='flex flex-row gap-4 m-4'>

      {/* Task Details */}
      <Card className="border rounded-2xl shadow-sm">
        <CardHeader className="text-lg font-bold border-b p-4">
          Task Details
        </CardHeader>
        <CardContent className="divide-y">
          {[
            { label: "Task Name", value: task.title },
            { label: "Description", value: task.description },
            { label: "Status", value: task.status },
            { label: "Task Started At", value: <GetDate punchInAt={task.TaskStartedAt} /> },
            { label: "Task Completed At", value: <GetDate punchInAt={task.TaskCompletedAt} /> },
            { label: "Total KW", value: task.TotalUnits },
            { label: "Per KW Cost", value: task.PerUnitCost },
            { label: "Total Received Amount", value: task.TotalReceivedAmount },
            { label: "Task Balance Amount", value: task.TaskBalanceAmount },
            { label: "Total Project Cost", value: task.TotalProjectCost },
            { label: "Remark", value: task.remark ?? "-" },
            { label: "Assign To", value: task.assignee?.name ?? "-" },
            { label: "Assign By", value: task.assigner?.name ?? "-" },
          ].map((item, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-4 py-3 text-sm">
              <span className="font-medium text-gray-600">{item.label}</span>
              <span className="col-span-2 text-gray-900">{item.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Client / Company Details */}
      <Card className="border rounded-2xl shadow-sm">
        <CardHeader className="text-lg font-bold border-b p-4">
          Client / Company Details
        </CardHeader>
        <CardContent className="divide-y">
          {[
            { label: "Client Name", value: task.clientName ?? "-" },
            { label: "Company Name", value: task.companyName ?? "-" },
            { label: "Address", value: task.address ?? "-" },
            { label: "City", value: task.city ?? "-" },
            { label: "State", value: task.state ?? "-" },
            { label: "Pin Code", value: task.pinCode ?? "-" },
            { label: "Mobile No", value: task.MobileNo ?? "-" },
            { label: "Created At", value: <GetDate punchInAt={task.createdAt} /> },
          ].map((item, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-4 py-3 text-sm">
              <span className="font-medium text-gray-600">{item.label}</span>
              <span className="col-span-2 text-gray-900">{item.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

    </main>
  )
}

export default page;
