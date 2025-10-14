import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

import { GetUserTaskDetailWithCompleteDetails } from "@/api/pay";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
// import PaymentDetails from "@/components/viewTable/PaymentDetails";
import PayMentDetail from "@/components/pay/PayMentDetail";
interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const idDecoded = decodeURIComponent(id);
  
  // get token from cookie
  const token = await getCookie("login-token", { cookies });
  
  const endDate = new Date();

// get first day of current month
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  // console.log("this is id of user to get details startDate", startDate);
  // fetch from API (pass correct date range)
  const response = await GetUserTaskDetailWithCompleteDetails(
  token as string,
  idDecoded,
  startDate,
  endDate
);

  if (!response) {
    return <p className="p-6">No data found</p>;
  }

  const { user, totalPunches } = response;

  return (
    <div className="p-6 space-y-6">
      {/* Basic Details */}
      <div className="flex w-full space-x-1">
        <Card className="p-2 w-full">
          <CardHeader>
            <CardTitle className="mt-2">Basic Details</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="grid grid-cols-1 gap-4">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Employee ID:</strong> {user?.EmplyID}</p>
            <p><strong>Mobile No:</strong> {user?.MobileNo}</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="mt-2">Bank Details</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="grid grid-cols-1 gap-4">
            <p><strong>Bank:</strong> {user?.BankDetails?.bankName} ({user?.BankDetails?.branch})</p>
            <p><strong>Account No:</strong> {user?.BankDetails?.accountNo}</p>
            <p><strong>IFSC Code:</strong> {user?.BankDetails?.IFSCode}</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Present Days:<strong>{totalPunches}</strong> </p>
        </CardContent>
      </Card>

      {/* Target Tasks */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Target Task Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48 w-full rounded-md border p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Target Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user?.TargetTasks?.map((task: any) => (
                  <TableRow key={task.TargetTaskID}>
                    <TableCell>{task.companyName}</TableCell>
                    <TableCell>{task.TaskType}</TableCell>
                    <TableCell>{new Date(task.TaskStartedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(task.TaskCompletedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{task.TotalUnits}</TableCell>
                    <TableCell>₹{task.TotalAmountTarget}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Tasks */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Achievement</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 w-full rounded-md border p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>TP Cost</TableHead>
                  <TableHead>Received Amount</TableHead>
                  <TableHead>P Balance</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user?.task?.map((t: any) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.title}</TableCell>
                    <TableCell>{t.companyName}</TableCell>
                    <TableCell>{new Date(t.TaskStartedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(t.TaskCompletedAt).toLocaleDateString()}</TableCell>
                    <TableCell>₹{t.TotalProjectCost}</TableCell>
                    <TableCell>₹{t.TotalReceivedAmount}</TableCell>
                    <TableCell>₹{t.TaskBalanceAmount}</TableCell>
                    <TableCell>{t.clientName}</TableCell>
                    <TableCell>{t.city}</TableCell>
                    <TableCell>{t.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <PayMentDetail id={idDecoded} />
    </div>
  );
};

export default Page;
