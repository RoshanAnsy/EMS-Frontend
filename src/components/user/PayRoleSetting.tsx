"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next/client";
import { UpdatePayReceiptPrintApi } from "@/api/pay";

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

interface PayRoleSettingProps {
  PayRoleSetting: PayRoleSettingsState;
}

const PayRoleSetting = ({ PayRoleSetting }: PayRoleSettingProps) => {
  const token = getCookie("login-token");

  const [settings, setSettings] = useState<PayRoleSettingsState>({
    FixAmount: false,
    VariableAmount: false,
    TotalAmount: false,
    Tds: false,
    AnyTax: false,
    TravelCost: false,
    OtherCost: false,
    FoodAllowanceCost: false,
    MedicleInsuranceCost: false,
    PFAmount: false,
    GratuityAmount: false,
    LaultyAmount: false,
    MisleneousAmount: false,
  });

  // ✅ Load server-side settings when component mounts
  useEffect(() => {
    if (PayRoleSetting) {
      setSettings(PayRoleSetting);
    }
  }, [PayRoleSetting]);

  const handleToggle = (key: keyof PayRoleSettingsState) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    try {
      const response = await UpdatePayReceiptPrintApi(token as string, settings);
      alert("✅ Settings saved successfully.");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save settings.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Payroll Settings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.keys(settings).map((key) => (
          <div
            key={key}
            className="flex items-center justify-between border p-3 rounded-lg hover:bg-gray-50 transition"
          >
            <Label className="capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </Label>
            <Switch
              checked={settings[key as keyof PayRoleSettingsState]}
              onCheckedChange={() => handleToggle(key as keyof PayRoleSettingsState)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default PayRoleSetting;
