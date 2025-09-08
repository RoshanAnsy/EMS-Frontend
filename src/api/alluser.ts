import axios from "axios";

export interface UserRecord {
    id: number;
    name: string;
    email: string;
    role: string;
}
export interface UserPagination {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  hasNext: boolean;
  hasPrev: boolean;
  isApproximate: boolean;
}
export type UserData = UserRecord[];

export interface User {
  success: boolean;
  message: string;
  data: UserData;
  pagination: UserPagination;
}

export const getAllUser = async (
    currentPage: number = 1,
    pageLimit: number = 1,
    token:string
):Promise<User> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/getAllUsers?page=${currentPage}&limit=${pageLimit}`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}