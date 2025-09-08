"use client";


import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GetUserList } from "@/api/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { getCookie } from "cookies-next/client";
import { GetSideBar, UpdateAccessRights } from "@/api/appsidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

type LoginFormInputs = {
  id: string; // userId
  Menu: {
    MenuId: string;
    subMenu: {
      SubMenuId: string;
      canView: boolean;
    }[];
  }[];
};

type User = {
  id: string;
  name: string;
};

const AccessRights = () => {
  const {  handleSubmit, setValue, control, watch } =
    useForm<LoginFormInputs>({
      defaultValues: { id: "", Menu: [] },
    });

 
  const [users, setUsers] = useState<User[]>([]);
  const [sideBarData, setSideBarData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { fields: menuFields, replace } = useFieldArray({
    control,
    name: "Menu",
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const token = getCookie("login-token");
      if (!token) return;
      const response = await GetUserList(token as string);
      setUsers(response?.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Fetch sidebar
  const fetchAppSideBar = async (targetUserId: string) => {
    try {
      const token = getCookie("login-token");
      if (!targetUserId) return;
      const response = await GetSideBar(targetUserId,token as string);
      console.log("Selected user id:", targetUserId);
      console.log("Sidebar API response:", response);

      const unassignedMenus = response?.unassignedMenus || [];

      // Transform API → form structure
      const transformed = unassignedMenus.map((menu: any) => ({
        MenuId: menu.id,
        subMenu: menu.SubMenus.map((sub: any) => ({
          SubMenuId: sub.id,
          canView: false,
        })),
      }));

      replace(transformed); // populate form
      setSideBarData(unassignedMenus);
    } catch (err) {
      console.error("Error fetching sidebar:", err);
    }
  };

  // initial load → current logged-in user
  useEffect(() => {
    fetchUsers();
    const ID = getCookie("userID") as string;
    if (ID) {
      setValue("id", ID);
      fetchAppSideBar(ID);
    }
  }, []);

  // Save handler
  const handleSave = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      console.log("Raw Form data:", data);

      // Transform payload → only selected submenus
      const transformed = data.Menu.map((menu) => {
        // const menuDetails = sideBarData.find((m) => m.id === menu.MenuId);
        const selectedSubs = menu.subMenu
          .filter((s) => s.canView)
          .map((s) => ({
            SubMenuId: s.SubMenuId,
            canView: true,
          }));

        if (selectedSubs.length === 0) return null;

        return {
          MenuId: menu.MenuId,
          subMenu: selectedSubs,
        };
      }).filter(Boolean);

      const finalPayload = {
        userId: data.id,
        Menus: transformed,
      };

      console.log("Final Payload to API:", finalPayload);

      const response = await UpdateAccessRights(finalPayload as any);
      if (response?.success) {
        toast.success("Access rights updated successfully");
      } else {
        toast.error("Failed to update access rights");
      }
    } catch (err) {
      toast.error("Error updating access rights");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-w-[30%] mx-auto rounded-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold">Provide access</h1>
        <Link href="/view/user/userList">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <Card className="text-black text-sm font-normal p-8">
        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          <div className="flex flex-row gap-4">
            {/* Select User */}
            <div>
              <Label htmlFor="user">Select User</Label>
              <Select
                onValueChange={(value) => {
                  setValue("id", value);       // update selected user in form
                  fetchAppSideBar(value);      // fetch sidebar for that user
                }}
                value={watch("id")}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sidebar Rights */}
            <div>
              <Label>Access Rights</Label>
              <ScrollArea className="h-[200px] w-[280px] rounded-md border p-4 bg-white shadow-sm">
                {menuFields.map((menu, menuIndex) => (
                  <div key={menu.id} className="mb-4">
                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-100">
                      <span className="font-semibold text-gray-800">
                        {sideBarData.find((m) => m.id === menu.MenuId)?.MenuName}
                      </span>
                    </div>

                    <div className="ml-6 mt-2 space-y-2">
                      {menu.subMenu.map((sub, subIndex) => {
                        const subName = sideBarData
                          .find((m) => m.id === menu.MenuId)
                          ?.SubMenus.find((s: any) => s.id === sub.SubMenuId)
                          ?.SubMenuName;

                        return (
                          <div
                            key={sub.SubMenuId}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
                          >
                            <span className="text-sm text-gray-600">
                              {subName}
                            </span>
                            <Switch
                              checked={watch(
                                `Menu.${menuIndex}.subMenu.${subIndex}.canView`
                              )}
                              onCheckedChange={(checked) =>
                                setValue(
                                  `Menu.${menuIndex}.subMenu.${subIndex}.canView`,
                                  checked
                                )
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 rounded-full hover:bg-blue-950"
          >
            {loading ? "Saving..." : "Save Access Rights"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AccessRights;
