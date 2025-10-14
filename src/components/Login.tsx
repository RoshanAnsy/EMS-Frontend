"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import URV from '../../public/URV.png';
// import Biller from '../../public/Biller.png';
import BillerLogo from '../../public/Biller-Logo.png';
// import icon from '../../public/icon.png'
// import vender from '../../public/VendorLogin.png'
import { useRouter } from 'next/navigation';
import { useSetCookie } from 'cookies-next';
import { useForm } from "react-hook-form";
import userProfileStore from '@/store/user.store';
import { Card } from './ui/card';
import { Eye, EyeOff } from "lucide-react";

type LoginFormInputs = {
  EmplyID: string;
  password: string;
};
const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const setCookie = useSetCookie();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {setUserProfile,name} = userProfileStore();

  const handleLogin = async (data:{EmplyID:string,password:string}) => {
    setLoading(true);
    setError('');
    
    try {
      // console.log(object)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { EmplyID:data.EmplyID, password:data.password });
      setCookie('login-token',response.data.token)
      setCookie('userID',response.data.id);
      setUserProfile(response.data.name,response.data.email,response.data.role);
      console.log("this is login name:",name)
      localStorage.setItem('token', response.data.token);
      router.push(`/view/attendance`)
    } catch (err) {
      setError(`Login failed. Please check your credentials and try again. ${err}`,);
      router.push('/login')
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className='flex justify-center items-center w-full border-r-8  '>
    <div className=" items-center  h-screen hidden md:flex flex-1 " > 
      <Image src={URV} alt="Picture of the author" className=' h-full rounded-l-2xl' />
    </div>
    <Card className="flex flex-col min-w-[30%] sm:mx-12 my-24 p-6 rounded-lg shadow-md">
      
     <p className='font-bold text-xl text-center'>URV FORTUNE PVT.LTD</p>
      <div className=' text-black text-sm font-normal p-12 justify-center'>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-4">
          <Label htmlFor="EmplyID">Enter your ID</Label>
          <Input
          {...register("EmplyID", { required: true })}
            className="mt-1  w-full"
          />
        </div>
        {/* <div className="mb-4 relative">
          <Label htmlFor="password">Password</Label>
          <Input
          type={showPassword ? "text" : "password"}
          {...register("password", { required: true })}
            className="mt-1  w-full"
          />
          <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
        </div> */}

        <div className="mb-4 relative">
  <Label htmlFor="password">Password</Label>
  <div className="relative mt-1">
    <Input
      type={showPassword ? "text" : "password"}
      {...register("password", { required: true })}
      className="w-full pr-10"
    />
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  </div>
</div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full bg-blue-900 rounded-full hover:bg-blue-950">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {/* <Link className='w-full mb-4 text-blue-900 font-bold' href={``}>Forgot your password</Link> */}
      </form>
      </div>
    </Card>
   </div>
  );
};

export default Login;