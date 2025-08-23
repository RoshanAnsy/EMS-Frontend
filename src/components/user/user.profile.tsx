
"use client"

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { deleteCookie } from 'cookies-next/client';
import { redirect } from 'next/navigation';
import userProfileStore from '@/store/user.store';

const userProfile = () => {
    const { email, name, setUserProfile } = userProfileStore();
    const logout = () => {
        deleteCookie('login-token');
        setUserProfile('', '','');
        redirect('/login');
      };
  return (
      <Popover>
            <PopoverTrigger>
                <div className=' flex gap-x-2'>
                {/* <li>{name}</li> */}
                <p  
                 className=' flex w-6 h-6 cursor-pointer text-black bg-[#6EE7B7] rounded-full p-4 items-center text-center justify-center' >{name[0].toUpperCase()}</p>
                </div>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col gap-y-4'>
                <div className='flex items-center gap-8 shadow-none'>
                <p className=' flex w-6 h-6 text-black bg-[#6EE7B7] rounded-full p-4  items-center justify-center' >{name[0].toUpperCase()}</p>
                <p className='flex flex-col items-start'>
                    <span>{name}</span>
                    <span className='text-gray-500'>{email}</span>
                </p>
                </div>
                <div className='flex flex-col gap-y-2'>
                <Button variant='secondary' className='cursor-pointer' onClick={logout}>
                    Logout
                </Button>
                </div>
            </PopoverContent>
        </Popover>
  )
}

export default userProfile;
