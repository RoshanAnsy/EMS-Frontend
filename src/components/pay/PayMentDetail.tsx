// import React from 'react'

// const PayMentDetails = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default PayMentDetails




"use client";
import { MakePaymentToEmployeeApi } from "@/api/pay";
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
// import { UpdateUserDetailsApi } from "@/api/auth";
import { getCookie } from "cookies-next/client";
type LoginFormInputs = {
  customerID: string;
  FixAmount: number;
  VariableAmount: number;
  totalAmount: number;
  remark: string;
  Tds: number;
  AnyTax: number;
  TravelCost: number;
  OtherCost: number;
  FoodAllowanceCost: number;
  medicleInsuranceCost: number;
  PFAmount: number;
  GratuityAmount: number;
  LaultyAmount: number;
  MisleneousAmount: number;
};



const PayMentDetail = ({id}:{id:string}) => {
  const { register, handleSubmit, setValue } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error] = useState("");
 const token = getCookie("login-token");
  const handleLogin = async (data: LoginFormInputs) => {
    console.log("Form Data:", data);
    setLoading(true);

    try {
      const {
                      FixAmount,
                      VariableAmount,
                      totalAmount,
                      remark,
                      Tds,
                      AnyTax,
                      TravelCost,
                      OtherCost,
                      FoodAllowanceCost,
                      medicleInsuranceCost,
                      PFAmount,
                      GratuityAmount,
                      LaultyAmount,
                      MisleneousAmount}=data;
      
     const response = await MakePaymentToEmployeeApi(
                       id as string,
                      FixAmount,
                      VariableAmount,
                      totalAmount,
                      remark,
                      Tds,
                      AnyTax,
                      TravelCost,
                      OtherCost,
                      FoodAllowanceCost,
                      medicleInsuranceCost,
                      PFAmount,
                      GratuityAmount,
                      LaultyAmount,
                      MisleneousAmount,
                      token as string
                      );


      if (response.success == true) {
        toast.success("Paid Successfully");
        router.push("/view/pay/paymentDetail");
      }
    } catch (err) {
      toast.error("Failed to payment employee");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col  mx-auto p-4">
      

      {/* Form */}
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Left Column - Basic Details */}
          <Card>
            <CardHeader className="text-lg font-bold border-b mt-4">
              Basic 
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-4">
              <div className="flex flex-row gap-2">
                <div>
                  <Label htmlFor="FixAmount">Base Salary</Label>
                  <Input
                    id="FixAmount"
                    type="number"
                    maxLength={50}
                    {...register("FixAmount", { required: true, maxLength: 50 })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="VariableAmount">Bonus Amount</Label>
                  <Input
                    id="VariableAmount"
                    type="number"
                    maxLength={30}
                    {...register("VariableAmount", { required: true,maxLength:30 })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                  <Label htmlFor="totalAmount">Total Amount</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    maxLength={30}
                    {...register("totalAmount", { required: true,maxLength:30 })}
                    className="mt-1"
                  />
                </div>
              <div>
                <Label htmlFor="remark">Remarks </Label>
                <Textarea 
                  id="remark"
                  maxLength={200}
                  {...register("remark", { maxLength:200 })}
                  className="mt-1"
                />
              </div>
              
            </CardContent>
          </Card>

          {/* Right Column - Bank Details */}
          <Card>
            <CardHeader className="text-lg font-bold border-b mt-4">
              Other Details
            </CardHeader>
            <CardContent className="px-3 pb-3 space-y-4">
              <div>
                <Label htmlFor="Tds">TDS Amount</Label>
                <Input
                  id="Tds"
                  type="number"
                  maxLength={16}
                  {...register("Tds",{maxLength:16})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="AnyTax">Tax Amount</Label>
                <Input
                  id="AnyTax"
                  maxLength={11}
                  {...register("AnyTax",{maxLength:11})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="TravelCost">Travel Cost</Label>
                <Input
                  id="TravelCost"
                  maxLength={50}
                  {...register("TravelCost",{maxLength:50})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="FoodAllowanceCost">Food AllowanceCost</Label>
                <Input
                  id="FoodAllowanceCost"
                  maxLength={50}
                  {...register("FoodAllowanceCost",{maxLength:50})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="medicleInsuranceCost">Medical InsuranceCost</Label>
                <Input
                  id="medicleInsuranceCost"
                  maxLength={12}
                  {...register("medicleInsuranceCost", {maxLength:12 })}
                  className="mt-1"
                />
              </div>


              <div>
                <Label htmlFor="PFAmount">PF Amount</Label>
                <Input
                  id="PFAmount"
                  maxLength={14}
                  {...register("PFAmount", { maxLength:14 })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="GratuityAmount">Gratuity Amount </Label>
                <Input
                  id="GratuityAmount"
                  maxLength={10}
                  {...register("GratuityAmount", {maxLength:10 })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="conformpassword">Laulty Amount </Label>
                <Input
                  id="LaultyAmount"
                  maxLength={10}
                  {...register("LaultyAmount", { maxLength:10})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="conformpassword">Other Cost</Label>
                <Input
                  id="OtherCost"
                  maxLength={200}
                  {...register("OtherCost", { maxLength:200 })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="MisleneousAmount">Misleneous Amount</Label>
                <Input
                  id="MisleneousAmount"
                  maxLength={200}
                  {...register("MisleneousAmount", { maxLength:200 })}
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
            {loading ? "paying..." : "Pay"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PayMentDetail;
