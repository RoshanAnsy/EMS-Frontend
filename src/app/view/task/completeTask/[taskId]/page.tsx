import React from 'react'
import CompleteTask from '@/components/task/CompleteTask'
import { GetUserListForDropDown } from '@/api/auth'
import { getCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

// type TaskId={
//   id: string;
 
// }

interface PageProps{
  params:Promise<{ taskId: string }>;
}
const page = async({params}: PageProps) => {
  const { taskId } =await params;
  const idDecoded = decodeURIComponent(taskId);
  // const token = await getCookie('login-token', { cookies });
    // const response = await GetUserListForDropDown(token as string);
    // const Task: TaskId[] = response?.users || [];
  return (
    <div>
      <CompleteTask TaskIds={idDecoded}/>
    </div>
  )
}

export default page
