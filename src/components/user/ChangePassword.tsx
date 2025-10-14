"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '../ui/card';
import { Eye, EyeOff } from "lucide-react";
import { UpdatePassword } from '@/api/auth';
import { getCookie } from "cookies-next/client";

type ChangePasswordForm = {
  EmplyID: string;
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const { register, handleSubmit } = useForm<ChangePasswordForm>();
  const token = getCookie("login-token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = async (data: ChangePasswordForm) => {
    setLoading(true);
    setError('');
    try {
      if (data.password !== data.confirmPassword) {
        setError("Password and Confirm Password do not match.");
        setLoading(false);
        return;
      }
      const response=await UpdatePassword(token as string, data.EmplyID, data.password, data.confirmPassword);
      alert(response.message);
      // location.reload();
      // Uncomment below to redirect after successful update:
      router.push('/view/user/userList');
    } catch (err: any) {
      setError(`Updating password failed. ${err?.message || err}`);
      // router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col min-w-[30%] mx-auto p-8">
      <p className='font-bold text-xl text-center border-b'>Change Password</p>
      <div className='text-black text-sm font-normal p-12 justify-center'>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <Label htmlFor="EmplyID">Enter your ID</Label>
            <Input
              {...register("EmplyID", { required: true })}
              className="mt-1 w-full"
            />
          </div>

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
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="mb-4 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative mt-1">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", { required: true })}
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-blue-900 rounded-full hover:bg-blue-950">
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChangePassword;
