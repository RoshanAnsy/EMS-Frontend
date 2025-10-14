"use client";
import React from "react";
import { useEffect, useState } from "react";

// const GetLocalTime = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default GetLocalTime





export  function GetLocalTime({ punchInAt }: { punchInAt?: string | number }) {
  const [localTime, setLocalTime] = useState<string>("--");

  useEffect(() => {
    if (punchInAt) {
      const date = new Date(Number(punchInAt));
      const formatted = date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setLocalTime(formatted);
    }
  }, [punchInAt]);

  return <span>{localTime}</span>;
}



export  function GetDate({ punchInAt }: { punchInAt?: Date | string  }) {
  const [localTime, setLocalTime] = useState<string>("--");

  useEffect(() => {
    if (punchInAt) {
      const date = new Date(punchInAt);
      const formatted = date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setLocalTime(formatted);
    }
  }, [punchInAt]);

  return <span>{localTime}</span>;
}