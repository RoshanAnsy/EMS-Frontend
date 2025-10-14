"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { CreateUser } from "@/api/auth";
import { toast } from "sonner";
import { UpdateUserDetailsApi } from "@/api/auth";
import { getCookie } from "cookies-next/client";
type LoginFormInputs = {
  role: string;
  name: string;
  email: string;
  password: string;
  conformpassword: string;
  EmplyID: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  AadharID: string;
  PanNo: string;
  MobileNo: string;
  EmergencyNo: string;
  CurrentAddress: string;
  PermanentAddress: string;
  BranchName: string;
};

const UpdateUserDetails = ({id}:{id:string}) => {
  const { register, handleSubmit, setValue } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error] = useState("");
 const token = getCookie("login-token");
  const handleLogin = async (data: LoginFormInputs) => {
    console.log("Form Data:", data);
    setLoading(true);

    try {
      const {name,
            MobileNo,
            PanNo,
            AadharID,
            EmergencyNo,
            PermanentAddress,
            CurrentAddress,
            bankName,
            ifscCode,
            BranchName,
            accountNumber}=data;
      
      const response = await UpdateUserDetailsApi(
        name,MobileNo,
         
        PanNo,
        AadharID,
        EmergencyNo,
        PermanentAddress,
        CurrentAddress,
        bankName,
        ifscCode,
        BranchName,
        accountNumber,token as string,id
      );

      if (response.success == true) {
        toast.success("User Created Successfully");
        router.push("/view/user/userList");
      }
    } catch (err) {
      toast.error("Failed to create user");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col  mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-xl">Update User Details</h1>
        <Link
          href="/view/user/userList"
          className="text-sm text-blue-950 hover:underline"
        >
          <Button variant="outline">Summary</Button>
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Left Column - Basic Details */}
          <Card>
            <CardHeader className="text-lg font-bold border-b">
              Basic Details
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-4">
              <div className="flex flex-row gap-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    maxLength={50}
                    {...register("name", { required: true, maxLength: 50 })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    maxLength={30}
                    {...register("email", { required: true,maxLength:30 })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="EmplyID">AAdhar No.</Label>
                <Input
                  id="AadharID"
                  maxLength={12}
                  {...register("AadharID", { required: true,maxLength:12,minLength:12 })}
                  className="mt-1"
                />
              </div>


              <div>
                <Label htmlFor="password">Pan No.</Label>
                <Input
                  id="PanNo"
                  maxLength={14}
                  {...register("PanNo", { required: true,maxLength:14,minLength:10 })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="conformpassword">Mobile No. </Label>
                <Input
                  id="MobileNo"
                  maxLength={10}
                  {...register("MobileNo", { required: true,maxLength:10,minLength:10 })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="conformpassword">Emergency Contact No. </Label>
                <Input
                  id="Emergency"
                  maxLength={10}
                  {...register("EmergencyNo", { required: true,maxLength:10,minLength:10 })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="conformpassword">Current Address </Label>
                <Textarea 
                  id="CurrentAddress"
                  maxLength={200}
                  {...register("CurrentAddress", { required: true,maxLength:200 })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="conformpassword">Permanent Address</Label>
                <Textarea
                  id="PermanentAddress"
                  maxLength={200}
                  {...register("PermanentAddress", { required: true,maxLength:200 })}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Bank Details */}
          <Card>
            <CardHeader className="text-lg font-bold border-b">
              Bank Details
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-4">
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  maxLength={16}
                  {...register("accountNumber",{required:true,maxLength:16,minLength:9})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="ifscCode">IFSC Code</Label>
                <Input
                  id="ifscCode"
                  maxLength={11}
                  {...register("ifscCode",{required:true,maxLength:11,minLength:11})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  maxLength={50}
                  {...register("bankName",{required:true,maxLength:50})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bankName">Branch Name</Label>
                <Input
                  id="BranchName"
                  maxLength={50}
                  {...register("BranchName",{required:true,maxLength:50})}
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
            {loading ? "Updating..." : "Update User"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserDetails;
