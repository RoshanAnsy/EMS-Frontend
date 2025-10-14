// import React from 'react'

// const CreateTargetTask = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default CreateTargetTask



"use client";
import { CreateTaskApi } from "@/api/task";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { getCookie } from "cookies-next/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type TaskFormInputs = {
  // Task details
  title: string;
  description: string;
  AssignID: string;
  pinCode: number;
  city: string;
  state: string;
  MobileNo: number;
  Address: string;
  // projectCost: number;
  companyName: string;
  ClientName: string;

};

type DropDown={
  id: string;
  name: string;
}

const CreateTask = ({Users}:{Users:DropDown[]}) => {
  const { register, handleSubmit,setValue } = useForm<TaskFormInputs>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error] = useState("");
  const token = getCookie("login-token");

  const handleSubmitForm = async (data: TaskFormInputs) => {
    console.log("Form Data:", data);
    setLoading(true);

    try {
      const {
        title,
        description,
        AssignID,
        pinCode,
        city,
        state,
        MobileNo,
        Address,
        
        companyName,
        ClientName
      } = data;

      const response = await CreateTaskApi(
        title,
        description,
        AssignID,
        String(pinCode),
        city,
        state,
        String(MobileNo),
        Address,
        
        companyName,ClientName,
        token as string
      );

      if (response.success === true) {
        toast.success("Task Created Successfully");
        router.push("/view/task/taskList");
      }
    } catch (err) {
      toast.error("Failed to create task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-auto p-4 w-5xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-xl">Create Task</h1>
        <Link
          href="/view/task/taskList"
          className="text-sm text-blue-950 hover:underline"
        >
          <Button variant="outline">Task Summary</Button>
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Left Column - Basic Details */}
          <Card>
            <CardHeader className="text-lg font-bold border-b py-2">
              Task Details
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-4">
              {/* <div className="flex flex-row gap-2"> */}
                <div>
                  <Label htmlFor="title">Project Name</Label>
                  <Input
                    id="title"
                    maxLength={50}
                    {...register("title", { required: true, maxLength: 50 })}
                    className="mt-1"
                  />
                </div>

              {/* </div> */}

              {/* <div>
                <Label htmlFor="projectCost">Project Cost</Label>
                <Input
                  type="text"
                  id="projectCost"
                  inputMode="numeric"   // mobile will still show number keypad
                  {...register("projectCost", {
                    required: true,
                    
                    maxLength: 12,
                    pattern: /^[0-9]*$/,  // only numbers allowed
                  })}
                  // maxLength={12} // now works!
                  className="mt-1"
                />
              </div> */}
              

               <div>
              <Label htmlFor="role">Select Employee</Label>
              <Select onValueChange={(value) => setValue("AssignID", value)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {Users.map((item:DropDown,index:number) => (
                    <SelectItem key={index} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                  
                  {/* <SelectItem value="URV Fortune Pvt. Ltd.">URV Fortune Pvt. Ltd.</SelectItem>
                  <SelectItem value="URV Power Solutions">URV Power Solutions</SelectItem> */}
                  

                </SelectContent>
              </Select>
            </div>
               <div>
              <Label htmlFor="role">Company Name</Label>
              <Select onValueChange={(value) => setValue("companyName", value)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="URV Fortune Pvt. Ltd.">URV Fortune Pvt. Ltd.</SelectItem>
                  <SelectItem value="URV Power Solutions">URV Power Solutions</SelectItem>
                   <SelectItem value="URV-1">URV-1</SelectItem>
                  <SelectItem value="URV-2">URV-2</SelectItem>
                   <SelectItem value="URV-3">URV-3</SelectItem>
                  <SelectItem value="URV-4">URV-4</SelectItem>
                   <SelectItem value="URV-5">URV-5</SelectItem>
                  

                </SelectContent>
              </Select>
            </div>
            <div>
                <Label htmlFor="description">Project Description </Label>
                <Textarea 
                  id="description"
                  maxLength={200}
                  {...register("description", { required: true,maxLength:200 })}
                  className="mt-1"
                />
              </div>
              

             
              
            </CardContent>
          </Card>

          {/* Right Column - Bank Details */}
          <Card>
            <CardHeader className="text-lg font-bold border-b py-2">
              Client Details
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-4">
              <div>
                <Label htmlFor="ClientName">Client Name</Label>
                <Input
                  id="ClientName"
                  maxLength={30}
                  {...register("ClientName", {
                    required: true,
                    maxLength: 30,
                    minLength: 4,
                  })}
                  className="mt-1"
                />
              </div>
                
                <div>
                <Label htmlFor="MobileNo">Mobile No.</Label>
                <Input
                  type="text"
                  id="MobileNo"
                  inputMode="numeric"   // mobile will still show number keypad
                  {...register("MobileNo", {
                    required: true,
                    maxLength: 10,
                    minLength: 10,
                    pattern: /^[0-9]*$/,  // only numbers allowed
                  })}
                  maxLength={10} // now works!
                  className="mt-1"
                />
              </div>
              

              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  maxLength={30}
                  {...register("state", { required: true, maxLength: 30 })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="city">City Name</Label>
                <Input
                  id="city"
                  maxLength={30}
                  {...register("city", { required: true, maxLength: 30 })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="pinCode">PinCode</Label>
                <Input
                  type="text"
                  id="pinCode"
                  inputMode="numeric"   // mobile will still show number keypad
                  {...register("pinCode", {
                    required: true,
                    maxLength: 12,
                    minLength: 6,
                    pattern: /^[0-9]*$/,  // only numbers allowed
                  })}
                  maxLength={12} // now works!
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="Address">Address </Label>
                <Textarea
                  id="Address"
                  maxLength={30}
                  {...register("Address", { required: true, maxLength: 200 })}
                  className="mt-1"
                />
              </div>
             
            </CardContent>
          </Card>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-900 rounded-full hover:bg-blue-950"
          >
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
