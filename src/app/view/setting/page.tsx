import React from "react";
import PayRoleSetting from "@/components/user/PayRoleSetting";
import { FindPaymentReceiptSetting } from "@/api/pay";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";

interface PayRoleSettingsState {
  FixAmount: boolean;
  VariableAmount: boolean;
  TotalAmount: boolean;
  Tds: boolean;
  AnyTax: boolean;
  TravelCost: boolean;
  OtherCost: boolean;
  FoodAllowanceCost: boolean;
  MedicleInsuranceCost: boolean;
  PFAmount: boolean;
  GratuityAmount: boolean;
  LaultyAmount: boolean;
  MisleneousAmount: boolean;
}

const Page = async () => {
  const token = await getCookie("login-token", { cookies });
  const response = await FindPaymentReceiptSetting(token as string);
  const result: PayRoleSettingsState = response.Receipt;

  return (
    <div>
      <PayRoleSetting PayRoleSetting={result} />
    </div>
  );
};

export default Page;
