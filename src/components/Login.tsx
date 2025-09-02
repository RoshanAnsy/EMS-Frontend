"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import biller from '../../public/loginImage.png';
// import Biller from '../../public/Biller.png';
import BillerLogo from '../../public/Biller-Logo.png';
// import icon from '../../public/icon.png'
// import vender from '../../public/VendorLogin.png'
import { useRouter } from 'next/navigation';
import { useSetCookie } from 'cookies-next';
import { useForm } from "react-hook-form";
import userProfileStore from '@/store/user.store';


type LoginFormInputs = {
  email: string;
  password: string;
};
const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const setCookie = useSetCookie();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {setUserProfile,name} = userProfileStore();

  const handleLogin = async (data:{email:string,password:string}) => {
    setLoading(true);
    setError('');
    
    try {
      // console.log(object)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { email:data.email, password:data.password });
      setCookie('login-token',response.data.token)
      setCookie('userID',response.data.id);
      setUserProfile(response.data.name,response.data.email,response.data.role);
      console.log("this is login name:",name)
      localStorage.setItem('token', response.data.token);
      router.push(`/view`)
    } catch (err) {
      setError(`Login failed. Please check your credentials and try again. ${err}`,);
      router.push('/login')
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className='flex justify-center items-center w-full border-r-8 bg-neutral-50 '>
    <div className="flex items-center w-[60%] h-screen  " > 
      <Image src={biller} alt="Picture of the author" className=' h-full rounded-l-2xl' />
    </div>
    <div className="flex flex-col min-w-[30%]  mx-auto rounded-2xl  gap-14 p-8 ">
      <div className='flex justify-center gap-x-4 items-center'>
        <Image src={BillerLogo} alt="Picture of the author" />
      </div>
     <div className='flex justify-center gap-x-4 items-center' >
       {/* <Image src={vender}  alt="Picture of the author"/>  */}
       </div>
      <div className=' text-black text-sm font-normal p-12 justify-center'>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
          {...register("email", { required: true })}
            className="mt-1  w-full"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
          type='password'
          {...register("password", { required: true })}
            className="mt-1  w-full"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full bg-blue-900 rounded-full hover:bg-blue-950">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {/* <Link className='w-full mb-4 text-blue-900 font-bold' href={``}>Forgot your password</Link> */}
      </form>
      </div>
    </div>
   </div>
  );
};

export default Login;