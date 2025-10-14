"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {CreateUserMaping} from "@/api/alluser"
import {GetListOfUserOnHierarchyWise} from "@/api/alluser"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetListUserOnRoleBased } from "@/api/alluser";
import { Card } from "@/components/ui/card";
import { CreateUser } from "@/api/auth";
import { toast } from "sonner";
import { getCookie } from "cookies-next/client";

type LoginFormInputs = {
  role: string;
  manageUser: string;
  user: string;
  name: string;
  email: string;
  password: string;
  conformpassword: string;
  EmplyID: string;
  DateOfJoining: Date;
  AssignID:string;
};
type DropDown={
  id: string;
  name: string;
}
const UserMap = () => {
  const { register, handleSubmit, setValue } = useForm<LoginFormInputs>();
  const token = getCookie("login-token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role,setRole]=useState<string>("");
  const [error] = useState("");
  const [userList, setUserList] = useState<any[]>([]);
  const [UserManageList, setUserManageList] = useState<any[]>([]);
  // Fetch users based on role
  const GetUserManageList = async (role: string) => {
    try {
      setRole(role.toUpperCase());
      const result = await GetListUserOnRoleBased(role, token as string);
      setUserManageList(result.List); // set user list from API
    } catch (err) {
      console.error("Error fetching users:", err);
      setUserManageList([]);
    }
  };

  const GetUserList = async () => {
    try {
      const result = await GetListOfUserOnHierarchyWise(role, token as string);
      setUserList(result.users); // set user list from API
    } catch (err) {
      console.error("Error fetching users:", err);
      setUserList([]);
    }
  };

  const handleLogin = async (data: LoginFormInputs) => {
    console.log("Form Data:", data);
    setLoading(true);

    try {
      const Role = data.role?.toUpperCase();
      console.log("role", Role);
      const response = await CreateUserMaping(
        data.manageUser,
        [data.AssignID],
        
        token as string
      );

      if (response.success == true) {
        toast.success("User Assign Successfully");
        // router.push("/view/user/userList");
      }
    } catch (err) {
      toast.error("Failed to Assign user");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
     GetUserList();
  },[role])

  return (
    <div className="flex flex-col min-w-xl mx-auto rounded-2xl p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold">Map Users</h1>
        <Link
          href="/view/user/userList"
          className="text-sm text-blue-950 hover:underline"
        >
          <Button variant="outline">Summary</Button>
        </Link>
      </div>

      {/* Form */}
      <Card className="text-black text-sm font-normal p-8 w-full">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {/* Role */}
          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              onValueChange={(value) => {
                setValue("role", value);
                GetUserManageList(value); // fetch users when role changes
              }}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="Director">Director</SelectItem>
                <SelectItem value="Hos">Hos</SelectItem>
                <SelectItem value="StateHead">State Head</SelectItem>
                <SelectItem value="AreaManager">Area Manager</SelectItem>
                <SelectItem value="SalesOfficer">Sales Officer</SelectItem>
                <SelectItem value="AREAMANAGEROPS">Area Manager Ops</SelectItem>
                <SelectItem value="ACCOUNTANT">Accountant</SelectItem>
                <SelectItem value="SITESUPERVISOR">Site supervisor</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="CP1">CP-1</SelectItem>
                <SelectItem value="CP2">CP-2</SelectItem>
                <SelectItem value="SCP1">SCP-1</SelectItem>
                <SelectItem value="SCP2">SCP-2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Manage user (populated dynamically) */}
          <div>
            <Label htmlFor="manageUser">Select Manage user</Label>
            <Select onValueChange={(value) => setValue("manageUser", value)}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {UserManageList.length > 0 ? (
                  UserManageList.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="none">
                    No users available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Another user select (if needed separately) */}
          <div>
                       <Label htmlFor="role">Select Employee</Label>
                       <Select onValueChange={(value) => setValue("AssignID", value)}>
                         <SelectTrigger className="w-full mt-1">
                           <SelectValue placeholder="Select a role" />
                         </SelectTrigger>
                         <SelectContent>
                           {userList?.map((item:DropDown,index:number) => (
                             <SelectItem key={index} value={item.id}>
                               {item.name}
                             </SelectItem>
                           ))}
                           
                           {/* <SelectItem value="URV Fortune Pvt. Ltd.">URV Fortune Pvt. Ltd.</SelectItem>
                           <SelectItem value="URV Power Solutions">URV Power Solutions</SelectItem> */}
                           
         
                         </SelectContent>
                       </Select>
                     </div>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 rounded-full hover:bg-blue-950"
          >
            {loading ? "Save..." : "Save"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UserMap;
