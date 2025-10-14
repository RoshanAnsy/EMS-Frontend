import React from 'react'
import { getCookie } from "cookies-next/server"
import { cookies } from "next/headers"
import { GetUserDetails } from '@/api/auth' 
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {GetDate} from '@/utils/getLocation/GetLocalTime';
interface PageProps{
  params:Promise<{ id: string }>;
}

const page =async ({params}: PageProps) => {
    const { id } =await params;
  const idDecoded = decodeURIComponent(id);
  const token = await getCookie("login-token", { cookies })
  const res = await GetUserDetails( token as string,idDecoded);
  console.log("THIS IS USER DETAILS RESPONSE",res)
  return (
    <main className='flex justify-end m-4 gap-0.5'>
   
        <Card className="border rounded-2xl shadow-sm">
      <CardHeader className="text-lg font-bold border-b p-4">
        Basic Details
      </CardHeader>
      <CardContent className="divide-y">
        {[
          { label: "Emply ID", value: res?.user?.EmplyID },
          { label: "Name", value: res?.user?.name },
          { label: "Email", value: res?.user?.email },
          { label: "Role", value: res?.user?.role },
          { label: "Date of Joining", value: <GetDate punchInAt={res?.user?.DateOfJoining} /> },
          { label: "Created At", value: <GetDate punchInAt={res?.user?.createdAt} /> },
          { label: "Mobile No", value: res?.user?.MobileNo ?? "" },
          { label: "PAN No", value: res?.user?.PanNo ?? "" },
          { label: "Aadhar No", value: res?.user?.AdharNo ?? "" },
          { label: "Emergency Contact No", value: res?.user?.EmergencyContactNo ?? "" },
          { label: "Permanent Address", value: res?.user?.PermanentAddress ?? "" },
          { label: "Current Address", value: res?.user?.CurrentAddress ?? "" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 gap-4 py-3 text-sm"
          >
            <span className="font-medium text-gray-600">{item.label}</span>
            <span className="col-span-2 text-gray-900">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>

        
    
    <Card className="border rounded-2xl shadow-sm">
      <CardHeader className="text-lg font-bold border-b p-4">
        Bank Details
      </CardHeader>
      {res?.user?.BankDetails ==null ? (<CardContent>Bank details not update </CardContent>):(
        <CardContent className="divide-y">
        {[
          { label: "Bank Name", value: res?.user?.BankDetails?.bankName ?? "" },
          { label: "Account No.", value: res?.user?.BankDetails?.accountNo ?? "" },
          { label: "IFSC", value: res?.user?.BankDetails?.IFSCode ?? "" },
          { label: "Branch Name", value: res?.user?.BankDetails?.branch ?? "" },
          
        ].map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 gap-4 py-3 text-sm"
          >
            <span className="font-medium text-gray-600">{item.label}</span>
            <span className="col-span-2 text-gray-900">{item.value}</span>
          </div>
        ))}
      </CardContent>
      )}
      
    </Card>
      </main>
  )
}

export default page;
