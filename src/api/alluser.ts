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

export const GetListUserOnRoleBased = async (
    
    role:string,
    token:string)=> {

        console.log(role)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/GetListUserOnRoleBased`;
    const response = await axios.post(url,
        {Role:role.toUpperCase()},
         {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}


export const GetListOfUserOnHierarchyWise  = async (
    
    role:string,
    token:string)=> {

        console.log(role)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/UserListByRole?Role=${role.toUpperCase()}`;
    const response = await axios.get(url,
       
         {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const CreateUserMaping = async (
    
    assignedToId:string,
    assignUserIds:string[],
    token:string)=> {

        // console.log(role)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/CreateUserMaping`;
    const response = await axios.post(url,
        
        {  assignedToId, assignUserIds } ,
         {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const GetListUserAssign  = async (
   
    token:string)=> {

        // console.log(role)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/GetListUserAssign`;
    const response = await axios.get(url,
       
         {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

// export const GetTeamListAssign  = async (
//    id:string,startingdate:Date,endDate:Date,
//     token:string)=> {

//         // console.log(role)
//     const url = `${process.env.NEXT_PUBLIC_API_URL}/GetTeamListByID?UserID=${id}`;
//     const response = await axios.get(url,
       
//          {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     return response.data;
// }

export const GetTeamListAssign  = async (
   id:string,startingdate:Date,endDate:Date,
    token:string)=> {

        console.log(startingdate,endDate)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/GetTeamListAndTaskDetailByID?UserID=${id}&startOfMonth=${startingdate}&endOfMonth=${endDate}`;
    const response = await axios.get(url,
       
         {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}