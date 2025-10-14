import React from 'react'
import { getCookie } from "cookies-next/server"
import { cookies } from "next/headers"
import UpdateUserDetails from '@/components/user/UpdateUserDetails'
import { GetUserDetails } from '@/api/auth'
interface PageProps{
  params:Promise<{ id: string }>;
}
const page =async ({params}: PageProps) => {
  const { id } =await params;
    const idDecoded = decodeURIComponent(id);
    const token = await getCookie("login-token", { cookies })
    const res = await GetUserDetails( token as string,idDecoded);

//   const res = await getUserAttendance( idDecoded, token as string)
  return (
    <div>
      <UpdateUserDetails id={idDecoded}/>
    </div>
  )
}

export default page
