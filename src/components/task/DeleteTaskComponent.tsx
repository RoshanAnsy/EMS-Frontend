// import React from 'react'

// const DeleteTaskComponent = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default DeleteTaskComponent



"use client"
import React from 'react'
import { Button } from '../ui/button'
import { DeleteTask } from '@/api/task'
import { toast } from 'sonner'
import { getCookie } from "cookies-next/client";
const DeleteTaskComponent = async({id}:{id:string}) => {
     const token = getCookie("login-token");
    const DeleteTaskBYID=async(userID:string)=>{
    const response=await DeleteTask(userID,token as string);
    toast.success(response.message);
  }
  return (
      <Button variant="link" className="p-0 text-red-600" onClick={()=>DeleteTaskBYID(id)}>Delete</Button> 
  )
}

export default DeleteTaskComponent;

