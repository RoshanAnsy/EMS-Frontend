
"use client"

import React from 'react'
import  {DeletePaymentApi}  from '@/api/pay';
import { getCookie } from "cookies-next/client";
import { toast } from 'sonner';
import { Button } from '../ui/button';
const DeletePayment = ({id}:{id:string}) => {
    const token = getCookie("login-token");
    const payMentDelete=async()=>{
        const response= await DeletePaymentApi(token as string,id);
        toast(response?.message);
        location.reload();
    
    }
    
    
  return (
    <Button variant="link" onClick={payMentDelete} className='text-red-600'>Delete</Button>
  )
}

export default DeletePayment
