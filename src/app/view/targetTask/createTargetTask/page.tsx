import React from 'react'
// import CreateTargetTask from '@/components/task/CreateTask'
import CreateTargetTask from '@/components/TargetTask/CreateTargetTask';
import { GetUserListForDropDown } from '@/api/auth'
import { getCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

type DropDown={
  id: string;
  name: string;
}
const page = async() => {
  const token = await getCookie('login-token', { cookies });
    const response = await GetUserListForDropDown(token as string);
    const Users: DropDown[] = response?.users || [];
  return (
    <div>
      <CreateTargetTask Users={Users}/>
    </div>
  )
}

export default page
