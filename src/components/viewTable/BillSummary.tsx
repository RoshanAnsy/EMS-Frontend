"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Eye, FileText } from "lucide-react";
import { GetBillDetails } from "@/api/Bill";
import { useEffect, useState } from "react";
import { UploadBillParams } from "@/api/Bill";
import dayjs from "dayjs";
import {  Loader2 } from "lucide-react";


export default function BillSummary({ id }: { id: string }) {

  const [BillData, setBillData] = useState<UploadBillParams>();

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const { data } = await GetBillDetails(id as string);
        setBillData(data);
        console.log("this is response", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[id])

  console.log(BillData, "this is bill data")
  return (
    <div className="flex justify-center items-center  bg-gray-100 p-4 ">
      {BillData == null ? (<div className=" flex flex-col justify-center items-center"><Loader2 className="animate-spin w-6 h-6 text-gray-500" /> Loading</div>)
      :
      (
        <Card className="w-full max-w-lg border border-purple-300 shadow-md">
        {/* Header with gradient */}
        <CardHeader className="bg-gradient-to-r from-blue-700 to-red-400 text-white text-center py-1 rounded-t-md">
          <h2 className="">Bill Summary</h2>
        </CardHeader>

        <CardContent className="p-6">
          {/* Vendor Name */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm">Vendor Name</p>
            <p className=" text-lg">{BillData?.vendorName}</p>
          </div>

          {/* Bill & PO Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Bill No.</p>
              <p className="">{BillData?.billNo}</p>
            </div>
            <div>
              <p className="text-gray-500">Bill Date</p>
              <p className="">{dayjs(BillData?.billDate).format("DD/MM/YYYY")}</p>
            </div>
            <div>
              <p className="text-gray-500">PO No.</p>
              <p className="">{BillData?.poNo}</p>
            </div>
            <div>
              <p className="text-gray-500">PO Date</p>
              <p className="">{dayjs(BillData?.poDate).format("DD/MM/YYYY")}</p>
            </div>
          </div>

          {/* Site Name */}
          <div className="mt-4">
            <p className="text-gray-500 text-sm">Site Name</p>
            <p className="">{BillData?.siteName}</p>
          </div>

          {/* Description */}
          <div className="mt-4">
            <p className="text-gray-500 text-sm">Description</p>
            <p className=" text-sm">
              {BillData?.description}
            </p>
          </div>

          {/* Amounts */}
          <div className="flex  w-full gap-4 mt-6 text-center text-sm">
            <div>
              <p className="text-gray-500">Bill Net Amount</p>
              <p className="">{BillData?.netAmount}</p>
            </div>
            <div>
              <p className="text-gray-500">Tax Amount</p>
              <p className="">{BillData?.taxAmount}</p>
            </div>
            <div>
              <p className="text-gray-500">Bill Grand Total</p>
              <p className="">{BillData?.grandTotal}</p>
            </div>
          </div>
          <div className="mt-6">
              <p className="text-gray-500 text-sm">Attachment</p>
              <div className="flex items-center gap-8  p-2 border rounded-md mt-2">
                <FileText className="text-red-500" size={20} />
                {/* <div> */}
                  {/* <p className="text-sm ">FileName.pdf</p> */}
                  {/* <p className="text-xs text-gray-500">5 MB</p> */}
                {/* </div> */}
               <a href={BillData?.fileUrl} target="blank" className=" flex gap-x-2 items-center justify-end"><span className=" text-sm">view</span> <Eye className=" h-4 w-4 text-gray-600"/></a>
              </div>
            </div>
        </CardContent>
      </Card>
      )
      }
    </div>
  );
}
