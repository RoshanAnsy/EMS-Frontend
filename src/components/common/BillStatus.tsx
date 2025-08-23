"use client";

import React, { useEffect, useState, useCallback } from "react";
import { GetBillStatusDetails } from "@/api/Bill";
import { RefreshCw } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const color_data = [
  "#F97316",
  "#18AC81",
  "#6366F1",
  "#E11D48",
  "#1D78E1",
  "#11866E",
  "#9B4EC8",
  "#9B4EC8",
];
const data_dates=[{item:"1D",value:"1day"},{item:"3D",value:"3days"},{item:"1W",value:"1week"},{item:"1M",value:"1month"},{item:"1Y",value:"1year"}]
const tooltip_data=["Vendor Submitted Bills Count",
                  "Total Paid Bills Count",
                  " Bills Pending for Review",
                  "Total Rejected Bills Count",
                  "Total Submitted Bills Amount",
                  "Total Paid Bill Amount",
                  "Pending Bill Amount Remaining"
                 ]

interface types {
  label: string;
  value: number;
}

const BillStatus = () => {
  const [filter, setFilter] = useState<string>("1day"); // default to "1D"
  const [BillData, setBillData] = useState<types[]>();
  const [loading, setLoading] = useState<boolean>(false);
  // const [lastUpdated, setLastUpdated] = useState<string>("");
  const fetchData = useCallback(
    async (duration: string) => {
      try {
        const { data } = await GetBillStatusDetails(duration); // pass duration
        setBillData(data?.statistics);
        // setLastUpdated(data?.TimeAgo);
       
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, []);

  useEffect(() => {
    fetchData(filter);
  }, [filter, fetchData]);

  return (
    <div className="flex flex-col justify-center gap-y-2 bg-neutral-50 p-4 rounded-xl">
      <div className="flex justify-start gap-x-2">
        {data_dates.map((item, index) => (
          <div
            key={index}
            onClick={() => setFilter(item.value)}
            className={`flex cursor-pointer rounded-md py-1 px-2 text-center ${
              filter === item.value ? "bg-neutral-400 text-white" : "bg-neutral-200"
            }`}
          >
            <span className="text-sm">{item.item}</span>
          </div>
          
        ))}
        <button onClick={()=>{fetchData(filter); setLoading(true)}}className=" cursor-pointer">
          {
            loading ? <RefreshCw className="h-5 w-5 text-gray-700 animate-spin" />:
            <RefreshCw className="h-5 w-5 text-gray-700" />
          } 
        </button>
        {/* <p className=" flex gap-x-2 items-center"><span className=" text-sm">Last Refresh : <span> {lastUpdated}</span></span> </p> */}
        
      </div>
      <div className="flex justify-center gap-x-2 rounded-xl">
          {BillData?.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-y-2 text-white py-2 px-4 rounded-xl sm:w-full`}
              style={{ backgroundColor: color_data[index % color_data.length] }}
            >
              <span className="text-sm">{item?.label}:
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><span className=" text-sm w-3 h-3 text-neutral-300 mx-1 cursor-pointer">ⓘ</span></TooltipTrigger>
                    <TooltipContent>
                      <p>{tooltip_data[index]}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              <span className="text-sm">{item.value}</span>
            </div>
          ))}
      </div>
      
    </div>
  );
};

export default BillStatus;
