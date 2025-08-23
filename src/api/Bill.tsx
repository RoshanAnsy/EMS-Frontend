import axios from "axios";
import { BillStatus } from "@/types/article";
// import BillStatus from "@/components/common/BillStatus";

// enum BillStatus {
//   PENDING,
//   APPROVED,
//   REJECTED

// }

export interface PaginationTypes{
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
}

export interface UploadBillParams {
    id?:string;
    billNo: string;
    vendorName:string;
    siteName: string;
    billDate: string;
    poNo: string;
    poDate:string;
    netAmount:number;
    taxAmount:number;
    grandTotal:number;
    fileUrl:string;
    status?: BillStatus;
    description:string,
    createdAt?:string;
    pagination?:PaginationTypes;
    isCancelled?:boolean;
   
}


export const uploadBill = async (data: UploadBillParams) => {
  const token = localStorage.getItem("token"); // Replace with your actual token key

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/bill/Addbill`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



export const getBillSummary =async (currentPage:number=1, pageLimit:number=12,show:boolean=false)=>{
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/bill/getBill?page=${currentPage}&pageSize=${pageLimit}&showOnlyPaid=${show}`,
    {    
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  console.log("this api res",response.data)
  return response.data;
}

export const GetBillDetails = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/bill/getBillSummary/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}

export const GetBillStatus = async ()=>{
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/bill/getBillStatistics`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}

export const GetSignUrl = async ()=>{
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/upload/signed-url`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}

//get status of bill
export const GetBillStatusDetails = async (timeSpam:string='') => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/bill/getBillStatistics?period=${timeSpam}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}

export const GetListOfSiteName =async(search:string)=>{
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/bill/getSiteOptions?search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}

export const DeleteBill = async (id: string,role:string,status:string) => {
  try{
      if(status=="PENDING"){
       return await dBill(id);
      }

      if(role == "ADMIN"){
        return await dBill(id);
      }
    return {
      "success":false,
      "message": "you can not delete bill Now"};
  }
  catch(e){
    console.log(e)
  }
}

async function dBill(id:string){
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/bill/updateBill/${id}`,
    {"isCancelled": true},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}
//get comments of bill
export const GetComments = async (BillId: string, currentPage:number=1,limit:number=3) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/comment/getComments/${BillId}?page=${currentPage}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}

//add comment to bill
export const AddComment = async (billId:string, commentText:string ) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/comment/addComment`,
    {billId, commentText},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}

// update comment
export const UpdateComment = async (commentId:string, commentText:string ) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/comment/updateComment/${commentId}`,
    {commentText},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}

//update the status of bill
export const UpdateBillStatus = async (billId:string, status:string ) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/bill/updateBill/${billId}`,
    {status},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}

//create payment
export const CreatePayment = async (billId:string, amount:number,tds:string, fileUrl:string, remark:string ) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/billPayment/paid`,
    {billId, amount, fileUrl, tds, remark},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}

//get payment details of bill
export const GetPaymentDetails = async (billId:string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/billPayment/get/${billId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
}