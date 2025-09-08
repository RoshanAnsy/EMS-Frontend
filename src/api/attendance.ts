import axios from "axios";
// import exp from "constants";

// ek ek attendance record
export interface AttendanceRecord {
  punchInTime: string;
  punchOutTime: string;
  PunchInLocation: string;
  punchOutLocation: string;
  status: string; // e.g., "PRESENT"
}

// data object -> keys dynamic dates hote hain (24/08/2025, 26/08/2025, etc.)
export type AttendanceData = {
  [date: string]: AttendanceRecord[];
};

// pagination ka type
export interface AttendancePagination {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  hasNext: boolean;
  hasPrev: boolean;
  isApproximate: boolean;
}

// final API response
export interface AttendanceApiResponse {
  success: boolean;
  message: string;
  data: AttendanceData;
  pagination: AttendancePagination;
}
export interface AttendancePostData {
  PunchOutLocation?: string;
  PunchInLocation?: string;
}

export interface UserAttendanceRecord {
  PunchOutAt: string;
  PunchInAt: string;
  PunchInLocation: string;
  punchOutLocation: string;
  status: string;
}

export interface UserAttendanceApiResponse {
  success: boolean;
  message: string;
  attendance: UserAttendanceRecord[];
}
export type UserAttendanceData = UserAttendanceRecord[];

export interface UserAttendanceApiResponse {
  success: boolean;
  message: string;
  data: UserAttendanceData;
  pagination: AttendancePagination;
}

export const getAttendanceSummary = async (
  currentPage: number = 1,
  pageLimit: number = 3,
  startDate?: string,
  endDate?: string
): Promise<AttendanceApiResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/attendance/attendance?page=${currentPage}&limit=${pageLimit}`;

  if (startDate) url += `&startDate=${startDate}`;
  if (endDate) url += `&endDate=${endDate}`;

  const response = await axios.get<AttendanceApiResponse>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
//  console.log("this api res",response.data)
  return response.data;
};



export const getUserAttendance = async (
  userId: string,
  token: string,
  from?: Date,
  to?: Date,
  
): Promise<UserAttendanceApiResponse> => {
  

  // Convert dates to ISO string (or slice if you only want yyyy-mm-dd)
  // const fromStr = from.toISOString();
  // const toStr = to.toISOString();

  const url = `${process.env.NEXT_PUBLIC_API_URL}/userAttendance?userId=${userId}`;
console.log("token", token);
  
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("API response", response.data);
  return response.data;
};

 

export const MarkAttendanceApi = async (Type:string,token:string,Location:string) => {

  
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/punch`,
    {Location,Type},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export const MarkAttendanceApiPunchOut = async (Type:string,token:string,currentID:string,Location:string) => {

  
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/punchOut?id=${currentID}`,
    {Location,Type},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}


export const GetAttendanceType = async (token:string) => {

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/GetPunchOut`,
  
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
