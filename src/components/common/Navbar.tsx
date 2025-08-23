'use client';

import React, { useCallback, useEffect } from 'react';
import { House, Logs } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import icon from '../../../public/icon.png';
import { Button } from '../ui/button';
import {  getCookie } from 'cookies-next/client';
import userProfileStore from '@/store/user.store';
import Link from 'next/link';
import { GetUser } from '@/api/auth';
import { Inter } from 'next/font/google'
import NotificationsTrigger from '../notification/notifications.trigger';
import UserProfile from '../user/user.profile';


const inter = Inter({ subsets: ['latin'] })

const Navbar = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { name, setUserProfile } = userProfileStore();
  const pathname = usePathname();
  
  // Fetch user data and update profile
  const fetchUserData = useCallback(async () => {
    try {
      const {data} = await GetUser();
      console.log("after reload ",data)
      if(data!=null){
        setUserProfile(data.name, data.email,data.role);
      }
      // setUserProfile(data.name, data.email);
      console.log("data from navbar",name)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setUserProfile]);

  useEffect(() => {
    if (getCookie('login-token')) {
      fetchUserData();
    }
  }, [fetchUserData]);

  return (
    <div className='flex flex-col '>
      <div className='flex flex-auto text-black items-center justify-between px-8 py-2 border-custom-border h-14 bg-neutral-50 rounded' >
        {/* Logo Section */}
        <div className='flex items-center gap-4'>
          <Image src={icon} alt='logo' className='h-8 w-auto' />
          <p className='text-black  text-2xl'>Biller</p>
        </div>

        {/* Navigation Section */}
        <nav className={inter.className} >
          <ul className='flex items-center gap-6'>
            {name ? (<div className=' flex gap-x-6'>
              <NotificationsTrigger/>
              <UserProfile/>
              </div>
            ) : (
              <Link href={'/login'}>
                <Button
                  variant='secondary'
                  className='shadow-none text-white cursor-pointer bg-gradient-to-r from-[var(--color-gradient-start)] via-[var(--color-gradient-middle)] to-[var(--color-gradient-end)]'
                >
                  Login
                </Button>
              </Link>
            )}
          </ul>
        </nav>
      </div>
      {/* Search Section */}
      <div className='flex w-full min-h-[92vh] text-text-color'>
        <div className='bg-neutral-50 w-20 min-h-[90vh] flex flex-col gap-y-8 px-2 pt-12'>
          <Link href={'/view'}>
            <p className={`flex flex-col items-center text-center cursor-pointer `}>
              <House className={` cursor-pointer ${pathname === '/view' ? 'text-blue-500 bg-highLight' : ''}` }/>
              <span>Home</span>
            </p>
          </Link>
          <Link href={'/view/dataview'}>
            <p className={`flex flex-col items-center text-center cursor-pointer `}>
              <Logs className={` cursor-pointer ${pathname === '/view/dataview' ? 'text-blue-500 bg-highLight' : ''}` }/>
              <span>Summary</span>
            </p>
          </Link>
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
