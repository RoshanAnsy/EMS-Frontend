"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import URV from '../../public/URV-HRMS4a.png';
import { toast } from 'sonner';
import { UpdatePassword } from '@/api/auth';
import { useForm } from "react-hook-form";

import { Card } from './ui/card';
import { Eye, EyeOff } from "lucide-react";
import { getCookie } from "cookies-next/client";
type LoginFormInputs = {
  EmplyID: string;
  password: string;
  ConformPassword: string;
};
const ResetPassword = () => {
  const { register, handleSubmit,reset } = useForm<LoginFormInputs>();

//   const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
    const token = getCookie("login-token");

  const ResetPassword = async (data:{EmplyID:string,password:string,ConformPassword:string}) => {
    setLoading(true);
    setError('');
    
    try {
      // console.log(object)
      const response = await UpdatePassword(token as string,data.EmplyID, data.password,data.ConformPassword);
      toast.success("Password Reset Successfully");
      reset();
    } catch (err) {
      setError(`Login failed. Please check your credentials and try again. ${err}`,);
     
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className='flex  items-center w-full mt-8'>
    {/* <div className=" items-center  h-screen hidden md:flex flex-1 w-full" > 
      <Image src={URV} alt="Picture of the author" className=' h-full w-full rounded-l-2xl' />
    </div> */}
    <Card className="flex flex-col    rounded-lg shadow-md p-4">
      
     <p className='font-bold text-xl text-center'>Update Password</p>
      <div className=' text-black text-sm font-normal p-12 justify-center'>
      <form onSubmit={handleSubmit(ResetPassword)}>
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

  <Label htmlFor="ConformPassword" className='mt-3'>Conform Password</Label>
  <div className="relative mt-1">
    <Input
      type={showPassword ? "text" : "password"}
      {...register("ConformPassword", { required: true })}
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
          {loading ? 'Loading...' : 'Reset Password'}
        </Button>
        {/* <Link className='w-full mb-4 text-blue-900 font-bold' href={``}>Forgot your password</Link> */}
      </form>
      </div>
    </Card>
   </div>
  );
};

export default ResetPassword;