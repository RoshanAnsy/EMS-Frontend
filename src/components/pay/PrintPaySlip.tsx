"use client";

import React from "react";
import { PayRoleSettingsState } from "@/types/payRoleSetting";
import { getCookie } from "cookies-next/client";
import { GetPaymentDetails } from "@/api/pay";
import { Button } from "../ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface PrintPaySlipProps {
  id: string;
  printDetails: PayRoleSettingsState;
}

const PrintPaySlip = ({ id, printDetails }: PrintPaySlipProps) => {
  const token = getCookie("login-token");

  const PayMentDetails = async () => {
    try {
      const result = await GetPaymentDetails(token as string, id);

      if (!result?.paymentD) {
        alert("No payment details found.");
        return;
      }

      const payment = result.paymentD;
      const doc = new jsPDF();

      // ---------- HEADER ----------
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Payslip", 90, 15);

      doc.setFontSize(12);
      doc.text("URV Fortune pvt. Ltd.", 80, 22);
    //   doc.text("21023 Pearson Point Road", 68, 28);
    //   doc.text("Gateway Avenue", 80, 34);

      let y = 45;

      // ---------- BASIC INFO ----------
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const paidUser = payment?.paidToUser || {};

      const safeText = (value?: string | null) =>
        value ? String(value) : "--";

      doc.text("Date of Joining :", 14, y);
      doc.text(safeText(paidUser?.DateOfJoining), 50, y);
      doc.text("Employee Name :", 120, y);
      doc.text(safeText(paidUser?.name), 160, y);

      y += 6;
    //   doc.text("Pay Period :", 14, y);
    //   doc.text(safeText(payment?.payPeriod ?? "August 2025"), 50, y);
      doc.text("Designation :", 14, y);
      doc.text(safeText(paidUser?.role), 50, y);

      y += 6;
      doc.text("Paid At :", 14, y);
      doc.text(
        safeText(
          payment?.paidAt
            ? new Date(payment.paidAt).toLocaleDateString("en-IN")
            : ""
        ),
        50,
        y
      );
      doc.text("Mobile No. :", 120, y);
      doc.text(safeText(paidUser?.MobileNo), 160, y);

      // ---------- EARNINGS / DEDUCTIONS ----------
      const earnings: [string, string][] = [];
      const deductions: [string, string][] = [];

      const addIfTrue = (
        key: keyof PayRoleSettingsState,
        label: string,
        value: any,
        isDeduction = false
      ) => {
        if (printDetails[key] && value != null && value !== false) {
          const formattedValue = value.toString();
          if (isDeduction) deductions.push([label, formattedValue]);
          else earnings.push([label, formattedValue]);
        }
      };

      // Only print fields that are enabled in printDetails
      addIfTrue("FixAmount", "Basic", payment.FixAmount);
      addIfTrue("VariableAmount", "Incentive Pay", payment.VariableAmount);
      addIfTrue("FoodAllowanceCost", "Meal Allowance", payment.FoodAllowanceCost);
      addIfTrue("TravelCost", "Travel Allowance", payment.TravelCost);
      addIfTrue("AnyTax", "Professional Tax", payment.AnyTax, true);
      addIfTrue("Tds", "TDS", payment.Tds, true);
      addIfTrue("PFAmount", "Provident Fund", payment.PFAmount, true);
      addIfTrue("GratuityAmount", "Gratuity", payment.GratuityAmount, true);
      addIfTrue("LaultyAmount", "Loyalty Bonus", payment.LaultyAmount);
      addIfTrue("MisleneousAmount", "Miscellaneous", payment.MisleneousAmount);

      // ---------- TOTALS ----------
      const totalEarnings = earnings.reduce(
        (sum, [, val]) => sum + (parseFloat(val) || 0),
        0
      );
      const totalDeductions = deductions.reduce(
        (sum, [, val]) => sum + (parseFloat(val) || 0),
        0
      );
      const netPay = totalEarnings - totalDeductions;

      // ---------- TABLE ----------
      y += 10;
      autoTable(doc, {
        startY: y,
        head: [["Earnings", "Amount", "Deductions", "Amount"]],
        body: [
          ...Array.from({
            length: Math.max(earnings.length, deductions.length),
          }).map((_, i) => [
            earnings[i]?.[0] || "",
            earnings[i]?.[1] || "",
            deductions[i]?.[0] || "",
            deductions[i]?.[1] || "",
          ]),
          [
            "Total Earnings",
            totalEarnings.toString(),
            "Total Deductions",
            totalDeductions.toString(),
          ],
          ["", "", "Net Pay", netPay.toString()],
        ],
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 10,
        },
        headStyles: { fillColor: [230, 230, 230], textColor: 0 },
      });

      const finalY = (doc as any).lastAutoTable.finalY + 10;

      // ---------- FOOTER ----------
      doc.text(`Net Pay: ₹${netPay}`, 90, finalY);
      doc.text("This is a system generated payslip", 70, finalY + 25);

      // Signatures
      doc.text("Employer Signature", 30, finalY + 15);
      doc.text("Employee Signature", 140, finalY + 15);
      doc.line(25, finalY + 17, 80, finalY + 17);
      doc.line(135, finalY + 17, 190, finalY + 17);

      // ---------- SAVE ----------
      doc.save(`Payslip_${payment.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF");
    }
  };

  return (
    <Button variant="link" onClick={PayMentDetails}>
    Payslip
    </Button>
  );
};

export default PrintPaySlip;
