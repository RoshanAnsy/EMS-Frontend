import { GetPaymentListForEmp } from '@/api/pay';
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
import { toast } from 'sonner';

type Payment = {
  id: string;
  FixAmount: number;
  VariableAmount: number;
  totalAmount: number;
  remark: string | null;
  Tds: number;
  AnyTax: number;
  TravelCost: number;
  OtherCost: number;
  FoodAllowanceCost: number;
  medicleInsuranceCost: number;
  PFAmount: number;
  GratuityAmount: number;
  LaultyAmount: number;
  MisleneousAmount: number;
  paidAt: string; // ISO date string from Prisma

  paidToUser: {
    id: string;
    name: string;
    email: string;
    EmplyID: string;
    MobileNo: string;
  };

  paidByUser: {
    id: string;
    name: string;
    email: string;
    EmplyID: string;
    MobileNo: string;
  };
};

const Page = async () => {
  const token = await getCookie('login-token', { cookies });
  const response = await GetPaymentListForEmp(token as string);

  // match response structure
  const payments: Payment[] = response?.paymentList || [];



  return (
    <div className="p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold mb-4">Payment List</h1>
      </div>
      <div className="overflow-x-auto">
        <Table className="border-r-blue-50 min-w-[900px] border">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[150px] border-2 border-gray-300 text-start">Total Amount</TableHead>
              <TableHead className="w-[150px] border-2 border-gray-300 text-start">Fix Amount</TableHead>
              <TableHead className="w-[150px] border-2 border-gray-300 text-start">Variable Amount</TableHead>
              
              <TableHead className="border-2 border-gray-300 text-start">TDS</TableHead>
              <TableHead className="border-2 border-gray-300 text-start">Any Tax</TableHead>
             
              <TableHead className="border-2 border-gray-300 text-start">Paid By</TableHead>
              <TableHead className="border-2 border-gray-300 text-start">Paid At</TableHead>
              <TableHead className="border-2 border-gray-300 text-start">Remark</TableHead>
              {/* <TableHead className="border-2 border-gray-300 text-start">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y border-gray-100">
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                    <TableCell className="font-medium border-2 border-gray-100 text-start">{payment.totalAmount}</TableCell>
                  <TableCell className="font-medium border-2 border-gray-100 text-start">{payment.FixAmount}</TableCell>
                  <TableCell className="font-medium border-2 border-gray-100 text-start">{payment.VariableAmount}</TableCell>
                  
                  <TableCell className="border-2 border-gray-100 text-start">{payment.Tds}</TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">{payment.AnyTax}</TableCell>
                  
                  <TableCell className="border-2 border-gray-100 text-start">
                    {payment.paidByUser?.name} ({payment.paidByUser?.MobileNo})
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">
                    <GetDate punchInAt={payment.paidAt}/>
                  </TableCell>
                  <TableCell className="border-2 border-gray-100 text-start">{payment.remark || "-"}</TableCell>
                  {/* <TableCell className="border-2 border-gray-100 text-start">
                    <div className="space-x-4">
                      <Link href={`/view/payment/${payment.id}`}><Button>View</Button></Link>
                    </div>
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-gray-500">
                  No payments found
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
