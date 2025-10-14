"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { format } from "date-fns";
import { toast } from "sonner";
import { getCookie } from "cookies-next/client";
import { GetCurrentLocation } from "@/utils/getLocation/page";
import {GetLocalTime} from "@/utils/getLocation/GetLocalTime";
import {
  MarkAttendanceApi,
  MarkAttendanceApiPunchOut,
} from "@/api/attendance";

type MarkAttendanceProps = {
  Type: string;
  ID: string;
  punchInAt: string;
  punchOutAt:string;
};

const MarkAttendance = ({ Type, ID, punchInAt,punchOutAt }: MarkAttendanceProps) => {
  const [TypeS, setType] = useState<string>(Type);
  const [currentID, setCurrentID] = useState<string>(ID);
  const [formattedDate, setFormattedDate] = useState<string>("");

  const token = getCookie("login-token");

  useEffect(() => {
    if (punchInAt && !isNaN(Number(punchInAt))) {
      setFormattedDate(format(new Date(Number(punchInAt)), "dd-MM-yyyy hh:mm a"));
    }
  }, [punchInAt]);

  const ApiHandle = async () => {
    const location = await GetCurrentLocation();
    const response = await MarkAttendanceApi(
      "PUNCHIN",
      token as string,
      location.address as string
    );
    toast.success("Punch In Successfully.");
    setType(response?.result.Type);
    setCurrentID(response?.result.id);
  };

  const ApiPunchOut = async () => {
    const location = await GetCurrentLocation();
    const response = await MarkAttendanceApiPunchOut(
      "PUNCHOUT",
      token as string,
      currentID,
      location.address as string
    );
    toast.success("Punch Out Successfully.");
    setType(response?.result.Type);
  };

  return (
    <Card className="p-4">
      <h1 className="text-xl font-bold border-b">Mark Your Attendance</h1>
      <div>
        {TypeS === "PUNCHOUT" ? (
          <Button
            variant="secondary"
            className="hover:scale-xl hover:shadow-xl cursor-pointer border-2 border-purple-300"
            onClick={ApiHandle}
          >
            Punch In
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="hover:scale-xl hover:shadow-xl cursor-pointer border-2 border-purple-300"
            onClick={ApiPunchOut}
          >
            Punch Out
          </Button>
        )}
      </div>
      <p className="flex gap-1">
        <span className="font-bold text-purple-400">Punch In At:</span>
        {/* {formattedDate || "No punch yet"} */}
        <GetLocalTime punchInAt={punchInAt} />
      </p>
      <p className="flex gap-1">
        <span className="font-bold text-purple-400">Punch Out At:</span>
        {/* {formattedDate || "No punch yet"} */}
        <GetLocalTime punchInAt={punchOutAt} />
      </p>
    </Card>
  );
};

export default MarkAttendance;
