"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { Card } from "@/components/ui/card";
import { CreateUser } from "@/api/auth";
import { toast } from "sonner";
import { getCookie } from "cookies-next/client";
type LoginFormInputs = {
  role: string;
  name: string;
  email: string;
  password: string;
  conformpassword: string;
  EmplyID:string;
  DateOfJoining:Date;
};

const AddUser = () => {
  const { register, handleSubmit, setValue } = useForm<LoginFormInputs>();
  const token = getCookie("login-token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error] = useState("");


  const handleLogin = async (data: LoginFormInputs) => {
    console.log("Form Data:", data);
    setLoading(true);


    try {

        const Role=data.role?.toUpperCase();
        console.log("role",Role);
        const response = await CreateUser(
        data.name,
        data.email,
        data.password,
        data.conformpassword,
        Role,data.EmplyID,data.DateOfJoining,token as string
      );
        if(response.success==true)
        toast.success("User Created Successfully");
        router.push("/view/user/userList");

    } catch (err) {
      toast.error("Failed to create user");
      console.log(err)

    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="flex justify-center items-center w-full bg-neutral-50">
      

      <div className=" flex flex-col min-w-[30%] mx-auto rounded-2xl p-8">
        {/* Logo */}
        <div className="flex justify-between items-center mb-6">
          <h1 className=" font-bold">Add New User</h1>
          <Link href="/view/user/userList" className="text-sm text-blue-950 hover:underline"><Button variant='outline'>Summary</Button></Link>
        </div>
        

        {/* Form */}
        <Card className="text-black text-sm font-normal p-8 ">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6 ">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            <div>
              <div>
              <Label htmlFor="EmplyID">EmplyID</Label>
              <Input
                id="EmplyID"
                type="string"
                {...register("EmplyID", { required: true })}
                className="mt-1 w-full"
              />
            </div>
            </div>
            <div>
              <div>
              <Label htmlFor="DateOfJoining">Date Of Joining</Label>
              <Input
                id="DateOfJoining"
                type="Date"
                {...register("DateOfJoining", { required: true })}
                className="mt-1 w-full"
              />
            </div>
            </div>
            {/* Role */}
            <div>
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(value) => setValue("role", value)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="Director">Director</SelectItem>
                  <SelectItem value="Hos">Hos</SelectItem>
                  <SelectItem value="StateHead">State Head</SelectItem>
                  <SelectItem value="AREAMANAGER1">Area Manager 1</SelectItem>
                  <SelectItem value="AREAMANAGER2">Area Manager 2</SelectItem>
                  <SelectItem value="SalesOfficer">Sales Officer</SelectItem>
                  <SelectItem value="AREAMANAGEROPS">Area Manager Ops</SelectItem>
                  <SelectItem value="ACCOUNTANT">Accountant</SelectItem>
                  <SelectItem value="SITESUPERVISOR">Site supervisor</SelectItem>
                  <SelectItem value="TRAINEE">Trainee</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="CP1">CP-1</SelectItem>
                  <SelectItem value="CP2">CP-2</SelectItem>
                  <SelectItem value="SCP1">SCP-1</SelectItem>
                  <SelectItem value="SCP2">SCP-2</SelectItem>

                </SelectContent>
              </Select>
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
            <div>
              <Label htmlFor="conformpassword">Conform Password</Label>
              <Input
                id="conformpassword"
                type="password"
                {...register("conformpassword", { required: true })}
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
        </Card>
      </div>
    /* </div> */
  );
};

export default AddUser;
