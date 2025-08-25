"use client";

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSetCookie } from "cookies-next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import biller from "../../public/loginImage.png";
// import BillerLogo from "../../public/Biller-Logo.png";
// import userProfileStore from "@/store/user.store";

type LoginFormInputs = {
  role: string;
  name: string;
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, setValue } = useForm<LoginFormInputs>();
  const setCookie = useSetCookie();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
//   const { setUserProfile, name } = userProfileStore();

  const handleLogin = async (data: LoginFormInputs) => {
    setLoading(true);
    setError("");

    try {
      console.log("Form Data:", data);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          email: data.email,
          password: data.password,
          role: data.role,
          name: data.name,
        }
      );

      setCookie("login-token", response.data.token);
    //   setUserProfile(
    //     response.data.name,
    //     response.data.email,
    //     response.data.role
    //   );
      console.log("Logged in user:", name);
      localStorage.setItem("token", response.data.token);

      router.push(`/view`);
    } catch (err) {
      setError(
        `Login failed. Please check your credentials and try again. ${err}`
      );
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full bg-neutral-50">
      

      <div className="flex flex-col min-w-[30%] mx-auto rounded-2xl gap-14 p-8">
        {/* Logo */}
        <div className="flex justify-center gap-x-4 items-center">
          {/* <Image src={BillerLogo} alt="biller-logo" /> */}
        </div>

        {/* Form */}
        <div className="text-black text-sm font-normal p-8">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Role */}
            <div>
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(value) => setValue("role", value)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                className="mt-1 w-full"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="mt-1 w-full"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className="mt-1 w-full"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 rounded-full hover:bg-blue-950"
            >
              {loading ? "Adding in..." : "Add User"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
