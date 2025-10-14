import React from 'react'
import UserMap from '@/components/user/UserMap'
// import CreateTask from '@/components/task/CreateTask'
// import { GetUserListForDropDown } from '@/api/auth'
// import { getCookie } from 'cookies-next/server';
// import { cookies } from 'next/headers';
// type DropDown={
//   id: string;
//   name: string;
// }
const page = async() => {
  // const token = await getCookie('login-token', { cookies });
  //   const response = await GetUserListForDropDown(token as string);
  //   const Users: DropDown[] = response?.users || [];
  return (
    <div>
      <UserMap />
    </div>
  )
}

export default page
