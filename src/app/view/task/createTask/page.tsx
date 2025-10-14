import React from 'react'
import CreateTask from '@/components/task/CreateTask'
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
      <CreateTask Users={Users}/>
    </div>
  )
}

export default page
