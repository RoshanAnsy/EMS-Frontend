"use client";
import { CreateTargetTaskApi } from "@/api/task";
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
import { IndianRupee } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type TaskFormInputs = {
  TaskStartedAt:Date, TaskCompletedAt:Date, 
  TotalAmountTarget:number,TotalTarget:number,
  TotalUnits:number,assignedTo:string,TaskType:string,remark:string
  companyName:string
};

type DropDown={
  id: string;
  name: string;
}

const CreateTargetTask = ({Users}:{Users:DropDown[]}) => {
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
        TaskStartedAt, TaskCompletedAt, TotalAmountTarget,
        TotalTarget,TotalUnits,assignedTo,TaskType,remark,companyName
      } = data;

      const response = await CreateTargetTaskApi(
        TaskStartedAt, TaskCompletedAt, TotalAmountTarget,
      TotalUnits,assignedTo,TaskType,remark,companyName,
        token as string
      );

      if (response.success === true) {
        toast.success("Task Created Successfully");
        router.push("/view/targetTask/targetTaskList");
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
        <h1 className="font-bold text-xl">Create Target Task</h1>
        <Link
          href="/view/targetTask/targetTaskList"
          className="text-sm text-blue-950 hover:underline"
        >
          <Button variant="outline">Summary</Button>
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
              <div className="flex flex-row gap-2"> 
                 <div>
                  <Label htmlFor="TaskStartedAt">Task Started Date </Label>
                  <Input
                    id="TaskStartedAt"
                    type="date"
                    // maxLength={50}
                    {...register("TaskStartedAt", { required: true, maxLength: 50 })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="TaskCompletedAt">Task End Date </Label>
                  <Input
                    id="TaskCompletedAt"
                    type="date"
                    // maxLength={50}
                    {...register("TaskCompletedAt", { required: true, maxLength: 50 })}
                    className="mt-1"
                  />
                </div>

               </div> 

              

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
              <Label htmlFor="role">Task Type </Label>
              <Select onValueChange={(value) => setValue("TaskType", value)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select TaskType" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MONTHLY">Month </SelectItem>
                  <SelectItem value="YEARLY">Year</SelectItem>
                   
                  

                </SelectContent>
              </Select>
            </div>

               <div>
              <Label htmlFor="role">Select Employee</Label>
              <Select onValueChange={(value) => setValue("assignedTo", value)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select Employee" />
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
                  <SelectValue placeholder="Select company" />
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
            {/* <div>
                <Label htmlFor="description">Project Description </Label>
                <Textarea 
                  id="description"
                  maxLength={200}
                  {...register("description", { required: true,maxLength:200 })}
                  className="mt-1"
                />
              </div> */}
              

             
              
            </CardContent>
          </Card>

          {/* Right Column - Bank Details */}
          <Card>
            <CardHeader className="text-lg font-bold border-b py-2">
              Target Details
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-4">
              
                
                
              

              <div>
                <Label htmlFor="TotalUnits">Total KW</Label>
                <Input
                  id="TotalUnits"
                  maxLength={30}
                  type="number"
                  {...register("TotalUnits", { required: true, maxLength: 30 })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="TotalAmountTarget">Total Amount Target:<span><IndianRupee size={14}/></span></Label>
                <Input
                  id="TotalAmountTarget"
                  maxLength={30}
                  type="number"
                  {...register("TotalAmountTarget", {
                    required: true,
                    maxLength: 30,
                    minLength: 4,
                  })}
                  className="mt-1"
                />
              </div>
              
              

              <div>
                <Label htmlFor="remark">Remarks </Label>
                <Textarea
                  id="remark"
                  maxLength={200}
                  {...register("remark", {  maxLength: 200 })}
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

export default CreateTargetTask;
