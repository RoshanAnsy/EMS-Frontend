"use client";

import { Switch } from "@/components/ui/switch"
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Arrow from "../../../public/ArrowsOutSimple.png";
import { DeleteBill } from "@/api/Bill";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { UpdateBillStatus } from "@/api/Bill";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { ScrollArea } from "@/components/ui/scroll-area";
import { PaginationTypes } from "@/api/Bill";
import { ChevronRight, ChevronLeft, Loader2,IndianRupee   } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import dayjs from "dayjs";
import BillSummary from "./BillSummary";
import TimeLine from "./TimeLine";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import userProfileStore from "@/store/user.store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  MoreVertical,
  Eye,
  // Printer,
  Trash2,
  MessageSquareText,
} from "lucide-react";
import { getBillSummary } from "@/api/Bill";
import { UploadBillParams } from "@/api/Bill";
import BillPaid from "../bill/BillPaid";
import PaymentDetails from "./PaymentDetails";
// import { Number } from "zod";


const TableData = () => {
  const { role } = userProfileStore();
  const [data, setData] = useState<UploadBillParams[]>();
  const [page, setPage] = useState<PaginationTypes>();
  const [search, setSearch] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false)
  const [LoadingApproved, setLoadingApproved] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data,pagination } = await getBillSummary();
        setPage(pagination)
        setData(data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange =useCallback( async (value: boolean) => {
    setChecked(value);
  
    try {
      if (value) {
        // If the toggle is ON, call the API to get data for 'Open' status
        const { data, pagination } = await getBillSummary(page?.currentPage, 12);
        setPage(pagination);
        setData(data);
        console.log("Switched to Open!",data,pagination);
      } else {
        // If the toggle is OFF, call the API to get data for 'Closed' status
        const { data, pagination } = await getBillSummary(page?.currentPage, 12);
        setPage(pagination);
        setData(data);
        console.log("Switched to Closed!");
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  },[]);
  
  const FuncNextPage= async ()=>{
    try {
      if(page?.totalPages !== page?.currentPage){
      const { data,pagination } = await getBillSummary(Number(Number(page?.currentPage) + 1));
      setPage(pagination)
      setData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const FuncPrevPage= async ()=>{
    try {
      if( page?.currentPage !==1){
      const { data,pagination } = await getBillSummary(Number(Number(page?.currentPage) - 1));
      setPage(pagination)
      setData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // console.log("this is response", data,page);
  const FilterData =useCallback( async () => {
    try {
      console.log(search)
      const { data,pagination } = await getBillSummary(1,12);
      setPage(pagination)
      setData(data);
      console.log("this is response table data", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[search])

  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.length >= 0) {
        FilterData(); // debounced API call
      }
    }, 500);
  
    return () => clearTimeout(delayDebounce);
  }, [search, FilterData]);
  
  const HandleDeleteFun = async (id: string) => {
    try {
      const response = await DeleteBill(id,"","");
      if(response.success == false) {
        alert(`${response.message}`)
        return;
      }
        alert("Bill Deleted Successfully")
      
      const { data,pagination } = await getBillSummary(page?.currentPage);
      setPage(pagination)
      setData(data);
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  }

 const HandleStatusFun = async(id: string,status:string) => {
    try {
      setLoadingApproved(true)
      const response = await UpdateBillStatus(id,status);
      // console.log("this is delete response", response);
      if(response.success == false) {
        alert(`${response.message}`)
        return;
      }
        alert(`Bill ${status.toLocaleLowerCase()} Successfully`)
      
      const { data,pagination } = await getBillSummary(page?.currentPage);
      setPage(pagination)
      setData(data);
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
    setLoadingApproved(false)
    
 }
  

  return (
    <div
      className={`w-full p-4 bg-white rounded-lg shadow-md border border-gray-200 ${
        isFullscreen
          ? "fixed top-0 left-0 w-full h-full z-50 bg-white p-6 overflow-auto"
          : ""
      }`}
    >
      {/* Header Controls */}
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search Table"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 border-gray-300 shadow-sm"
        />
        <div className="flex items-center gap-3">
          <Switch checked={checked} onCheckedChange={handleChange} />
          <span className="w-[60px] text-sm text-gray-700">
            {checked ? "Closed" : "Open"}
          </span>
        </div>
        <div className="flex items-center gap-x-8 space-x-2 text-gray-500 text-sm">
          <div className="flex items-center space-x-2">
            <span>Items per page</span>
            <span className="bg-gray-200 px-2 py-1 rounded-md">{page?.pageSize}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={FuncPrevPage}
              className=" cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 cursor-pointer" />
            </Button>
            <span>{page?.currentPage}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={FuncNextPage}
              className=" cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 cursor-pointer" />
            </Button>
            <span>0- {page?.currentPage}</span>
            <span>of {page?.totalPages}</span>
          </div>
          <div className="flex space-x-8">
            <Image src="/filter.svg" alt="filter" width={25} height={20} />
            <Image src="/Export.svg" alt="filter" width={25} height={20} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Image src={Arrow} alt="arrow" className="cursor-pointer" />
            </Button>
          </div>
        </div>
        
      </div>

      {/* Loading or Table */}
      <div className="overflow-x-auto">
        {!data ? (
          <div className="flex flex-col items-center justify-center max-h-screen gap-2">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
            <p className="text-sm font-bold text-center">Loading...</p>
          </div>
        ) : (
          <Table className="w-full text-sm">
            <TableHeader className="bg-gray-100 text-gray-700 border-b">
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>BILL NO.</TableHead>
                <TableHead>BILL DATE</TableHead>
                <TableHead>PO NO.</TableHead>
                <TableHead>PO DATE</TableHead>
                <TableHead>FOR SITE</TableHead>
                <TableHead>GRAND TOTAL</TableHead>
                <TableHead>ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index} className={` ${row?.status === "PAID" ? "bg-green-100 border-b-white rounded-xl" : "bg-white"} `}>
                  <TableCell>{row.vendorName}</TableCell>
                  <TableCell>{row.billNo}</TableCell>
                  <TableCell>{dayjs(row.billDate).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>{row.poNo}</TableCell>
                  <TableCell>{dayjs(row.poDate).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>{row.siteName}</TableCell>
                  <TableCell>{row.grandTotal}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Drawer direction="right">
                      <DrawerTrigger>
                        <Eye className="w-4 h-4 cursor-pointer" />
                      </DrawerTrigger>
                      <ScrollArea>
                        <DrawerContent className="overflow-y-auto overflow-x-hidden min-h-screen w-[600px] md:w-[800px] lg:w-[1000px]">
                          <DrawerTitle className=" m-4">Bill View</DrawerTitle>
                          <DrawerDescription>
                            <BillSummary id={`${row.id} `} />
                            <TimeLine id={`${row.id} `} status={`${row?.status}`} />
                            <PaymentDetails id={`${row.id} `} />
                          </DrawerDescription>
                        </DrawerContent>
                      </ScrollArea>
                    </Drawer>

                    <Drawer direction="right">
                      <DrawerTrigger>
                      <MessageSquareText className="w-4 h-4 cursor-pointer" />
                      </DrawerTrigger>
                      <ScrollArea>
                        <DrawerContent className="overflow-y-auto overflow-x-hidden min-h-screen w-[600px] md:w-[800px] lg:w-[1000px]">
                          {/* <DrawerTitle className=" m-4">Bill View</DrawerTitle> */}
                          <DrawerDescription>
                            <TimeLine id={`${row.id} `} status={`${row?.status}`} />
                          </DrawerDescription>
                        </DrawerContent>
                      </ScrollArea>
                    </Drawer>
                    {/* <Button variant="ghost" size="icon">
                      <Printer className="w-4 h-4" />
                    </Button> */}
                    {/* <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button> */}
                     <AlertDialog>
                        <AlertDialogTrigger><Trash2 className=" text-red-900 h-4 w-4 cursor-pointer"/></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will delete your bill
                                and remove your data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=>HandleDeleteFun(row.id as string)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Popover>
                        <PopoverTrigger>
                          <MoreVertical className="w-4 h-4 cursor-pointer" />
                        </PopoverTrigger>

                        <PopoverContent>
                          <div className="flex flex-col gap-y-2 justify-items-end justify-between">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-sm">Bill status</span>
                            </div>

                            {/* Role-based rendering */}
                            {role === "ADMIN" ? (
                              row?.status === "PAID" ? (
                                <span className="text-green-900">Bill Payment Completed</span>
                              ) : row?.status === "APPROVED" ? (
                                <span className="text-green-900">Bill Approved</span>
                              ) : (
                                <>
                                  <Button
                                    variant="secondary"
                                    className="cursor-pointer"
                                    disabled={LoadingApproved}
                                    onClick={() => HandleStatusFun(row.id as string, "APPROVED")}
                                  >
                                    {LoadingApproved ? "Accepting..." : "Accept"}
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => HandleStatusFun(row.id as string, "REJECTED")}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )
                            ) : (
                              // For VENDOR or other roles
                              <span className="text-gray-800">
                                {row?.status === "PAID"
                                  ? "Bill Payment Completed"
                                  : row?.status === "APPROVED"
                                  ? "Bill Approved"
                                  : "IN Pending "}
                              </span>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>

                      
                    <div>
                      {row?.status == "APPROVED" && role == "ADMIN" &&
                      (
                        <AlertDialog open={open} onOpenChange={setOpen}>
                          <AlertDialogTrigger asChild>
                          <IndianRupee  className="text-green-900 h-4 w-4 cursor-pointer"/>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-white text-black">
                          <BillPaid id={row?.id as string} setOpen={setOpen} billAmount={Number(row?.grandTotal)} />
                          </AlertDialogContent>
                          
                        </AlertDialog>
                      // <DollarSign />
                      )}
                      </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default TableData;
