"use client"

import {  GridColDef } from '@mui/x-data-grid';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UpdateBillStatus } from '@/api/Bill';
import { ScrollArea } from "@/components/ui/scroll-area";
import BillSummary from "@/components/viewTable/BillSummary";
import TimeLine from "@/components/viewTable/TimeLine";
import PaymentDetails from "@/components/viewTable/PaymentDetails";
import { DeleteBill } from '@/api/Bill';
import BillPaid from '../bill/BillPaid';
import {
  MoreVertical,
  Eye,
  Trash2,
  MessageSquareText,
  IndianRupee,
} from "lucide-react";
import { ReactNode } from "react";
import userProfileStore from '@/store/user.store';
interface PopoverContentPropsTypes {
  id: string;
  status: string;
  TotalAmount: number;
}

// ✅ Column Definition
export const columns: GridColDef[] = [
  { field: 'billNo', headerName: 'Bill No', width: 130 },
  { field: 'vendorName', headerName: 'Vendor Name', width: 180 },
  { field: 'billDate', headerName: 'Bill Date', width: 150 },
  { field: 'poNo', headerName: 'PO No', width: 130 },
  { field: 'netAmount', headerName: 'Net Amount', width: 150, type: 'number' },
  { field: 'grandTotal', headerName: 'Grand Total', width: 160, type: 'number' },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 250,
    sortable: false,
    renderCell: (params) => {
      const id = `${params.row.id}`;
      const status = `${params.row?.status}`;

      return (
        <div className={`flex justify-start items-baseline mt-4 gap-4 text-sm w-full rounded-md `}>
          <SlideDrawer title="Bill View" triggerIcon={<Eye className="w-4 h-4 cursor-pointer" />}>
            <BillSummary id={id} />
            <TimeLine id={id} status={status} />
            <PaymentDetails id={id} />
          </SlideDrawer>

          <SlideDrawer title="Comments" triggerIcon={<MessageSquareText className="w-4 h-4" />}>
            <TimeLine id={id} status={status} />
          </SlideDrawer>

          <AlertDialogToDeleteBill id={id} status={status}>
            <Trash2 className="w-4 h-4 text-red-800" />
          </AlertDialogToDeleteBill>

          <PopoverContentToUpdateStatus id={id} status={status} TotalAmount={params.row.grandTotal} />

          <PopoverContentToAddPayment id={id} status={status} TotalAmount={params.row.grandTotal} />
        </div>

      );
    },
  },
];

const SlideDrawer = ({
  triggerIcon,
  title,
  children,
}: {
  triggerIcon: ReactNode;
  title: string;
  children: ReactNode;
}) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        {triggerIcon }
      </DrawerTrigger>
      <ScrollArea>
        <DrawerContent className="overflow-y-auto overflow-x-hidden min-h-screen w-[600px] md:w-[800px] lg:w-[1000px]">
          <DrawerTitle className="m-4">{title}</DrawerTitle>
          <DrawerDescription>{children}</DrawerDescription>
        </DrawerContent>
      </ScrollArea>
    </Drawer>
  );
};

const AlertDialogToDeleteBill = ({children,id,status}:{children:ReactNode,id:string,status:string})=>{
  const { role } = userProfileStore();
  const HandleDeleteFun = async (id: string) => {
      try {
        const response = await DeleteBill(id,role,status);
        if(response.success == false) {
          alert(`${response.message}`)
          return;
        }
          alert("Bill Deleted Successfully")
        
        // const { data,pagination } = await getBillSummary(page?.currentPage);
        
      } catch (error) {
        console.error("Error deleting bill:", error);
      }
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
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
          <AlertDialogAction onClick={()=>HandleDeleteFun(id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

//click on more icon

const PopoverContentToUpdateStatus = (props:PopoverContentPropsTypes)=>{
  const { role } = userProfileStore();
  const [LoadingApproved, setLoadingApproved] = useState<boolean>(false);
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
        
        // const { data,pagination } = await getBillSummary(page?.currentPage);
        // setPage(pagination)
        // setData(data);
      } catch (error) {
        console.error("Error deleting bill:", error);
      }
      setLoadingApproved(false)
      
   }
  return (
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
          props?.status === "PAID" ? (
            <span className="text-green-900">Bill Payment Completed</span>
          ) : props?.status === "APPROVED" ? (
            <span className="text-green-900">Bill Approved</span>
          ) : (
            <>
              <Button
                variant="secondary"
                className="cursor-pointer"
                disabled={LoadingApproved}
                onClick={() => HandleStatusFun(props.id as string, "APPROVED")}
              >
                {LoadingApproved ? "Accepting..." : "Accept"}
              </Button>
              <Button
                variant="secondary"
                className="cursor-pointer"
                onClick={() => HandleStatusFun(props.id as string, "REJECTED")}
              >
                Reject
              </Button>
            </>
          )
        ) : (
          // For VENDOR or other roles
          <span className="text-gray-800">
            {props?.status === "PAID"
              ? "Bill Payment Completed"
              : props?.status === "APPROVED"
              ? "Bill Approved"
              : "IN Pending "}
          </span>
        )}
      </div>
    </PopoverContent>
  </Popover>
  )
}

//add payment


const PopoverContentToAddPayment  = (props:PopoverContentPropsTypes)=>{
  const [open, setOpen] = useState<boolean>(false);
  const { role } = userProfileStore();
  return (
    <div>
      {props.status == "APPROVED" && role == "ADMIN" &&
      (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
          <IndianRupee  className="text-green-900 h-4 w-4 cursor-pointer"/>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white text-black">
          <BillPaid id={props.id} setOpen={setOpen} billAmount={props.TotalAmount} />
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}