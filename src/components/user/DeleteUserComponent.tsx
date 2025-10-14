
"use client"
import React from 'react'
import { Button } from '../ui/button'
import { DeleteUser } from '@/api/auth'
import { toast } from 'sonner'
import { getCookie } from "cookies-next/client";
const DeleteUserComponent = async({id}:{id:string}) => {
     const token = getCookie("login-token");
    const DeleteUserBYID=async(userID:string)=>{
    const response=await DeleteUser(userID,token as string);
    toast.success(response.message);
  }
  return (
      <Button variant="link" className="p-0 text-red-600" onClick={()=>DeleteUserBYID(id)}>Delete</Button> 
  )
}

export default DeleteUserComponent;
