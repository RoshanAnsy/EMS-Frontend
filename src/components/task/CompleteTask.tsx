"use client";
import { CompleteTaskApi } from "@/api/task";
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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
type TaskFormInputs = {
  
 TaskStartedAt:string, TaskCompletedAt:Date,TotalReceivedAmount:number,projectCost:number,
            PerUnitCost:number,TotalUnits:number,TaskBalanceAmount:number,remark:string,token:string

};

type TaskId={
  idDecoded: string;
 
}

const CompleteTask = ({TaskIds}:{TaskIds:string}) => {
  const { register, handleSubmit,setValue } = useForm<TaskFormInputs>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error] = useState("");
  const token = getCookie("login-token");
  const taskId=TaskIds;
  const handleSubmitForm = async (data: TaskFormInputs) => {
    console.log("Form Data:", data);
    setLoading(true);

    try {
      const {
         TaskStartedAt, TaskCompletedAt,TotalReceivedAmount,
            PerUnitCost,TotalUnits,TaskBalanceAmount,remark,projectCost
      } = data;
        console.log(data);
      const response = await CompleteTaskApi(
        taskId as string, TaskStartedAt, TaskCompletedAt,TotalReceivedAmount,
            PerUnitCost,TotalUnits,TaskBalanceAmount,remark,projectCost,token as string
      );

      if (response.success === true) {
        toast.success("Task Updated Successfully");
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
        <h1 className="font-bold text-xl">Complete Task</h1>
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
                  <Label htmlFor="TaskStartedAt">Project Started Date</Label>
                  <Input
                    id="titTaskStartedA"
                    // maxLength={50}
                    type="date"
                    {...register("TaskStartedAt", { required: true})}
                    className="mt-1"
                  />
                </div>

              {/* </div> */}

              <div>
                <Label htmlFor="TaskCompletedAt">Project Completed Date</Label>
                <Input
                  type="date"
                  id="TaskCompletedAt"
                //   inputMode="numeric"   // mobile will still show number keypad
                  {...register("TaskCompletedAt", {
                    required: true,
                      // only numbers allowed
                  })}
                  // maxLength={12} // now works!
                  className="mt-1"
                />
              </div>
              

             
            <div>
                <Label htmlFor="PerUnitCost">Cost PerUnit  </Label>
                <Input 
                  id="PerUnitCost"
                  maxLength={200}
                  {...register("PerUnitCost", { required: true,maxLength:200 })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="TotalUnits">Total Units </Label>
                <Input 
                  id="TotalUnits"
                  maxLength={200}
                  {...register("TotalUnits", { required: true,maxLength:200 })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="projectCost">Project Cost  </Label>
                <Input 
                  id="projectCost"
                  maxLength={200}
                  {...register("projectCost", { required: true,maxLength:200 })}
                  className="mt-1"
                />
              </div>

             
              
            </CardContent>
          </Card>

          {/* Right Column - Bank Details */}
          <Card>
            <CardHeader className="text-lg font-bold border-b py-2">
              Payment Details
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-4">
              <div>
                <Label htmlFor="TotalReceivedAmount">Total Received Amount</Label>
                <Input
                  id="TotalReceivedAmount"
                  maxLength={30}
                  {...register("TotalReceivedAmount", {
                    required: true,
                    maxLength: 30,
                    minLength: 4,
                  })}
                  className="mt-1"
                />
              </div>
                
                <div>
                <Label htmlFor="TaskBalanceAmount">Total Pending Balance </Label>
                <Input
                  type="number"
                  id="TaskBalanceAmount"
                  inputMode="numeric"   // mobile will still show number keypad
                  {...register("TaskBalanceAmount", {
                    required: true,
                    maxLength: 150,
                    
                    pattern: /^[0-9]*$/,  // only numbers allowed
                  })}
                  maxLength={50} // now works!
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="remark">Remarks  </Label>
                <Textarea 
                  id="remark"
                  maxLength={200}
                  {...register("remark", { required: true,maxLength:200 })}
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
            {loading ? "Save..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompleteTask;
