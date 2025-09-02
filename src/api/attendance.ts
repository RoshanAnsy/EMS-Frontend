import axios from "axios";
import exp from "constants";

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
  PunchInTime: string;
  PunchOutTime: string;
  PunchInLocation: string;
  punchOutLocation: string;
  status: string;
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
  currentPage: number = 1,
  pageLimit: number = 3,
  userId: string,
  startDate?: string,
  endDate?: string
): Promise<UserAttendanceApiResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/attendance/user-attendance/${userId}?page=${currentPage}&limit=${pageLimit}`;

  if (startDate) url += `&startDate=${startDate}`;
  if (endDate) url += `&endDate=${endDate}`;

  const response = await axios.get<UserAttendanceApiResponse>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
 console.log("this api res",response.data)
  return response.data;
};
 

export const PostAttendance = async (data:AttendancePostData) => {
  const token = localStorage.getItem("token");
  console.log("this is the data",data);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/attendance/punch`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}