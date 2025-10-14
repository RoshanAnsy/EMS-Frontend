"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getCookie } from "cookies-next/client";
import { GetAccessSideBar } from "@/api/auth";
// import axios from "axios";
import { RemoveSubMenu } from "@/api/appsidebar";
interface SubMenu {
  id: string;
  SubMenuName: string;
  Routes: string;
  Icon: string;
  Priority: number;
}

interface Menu {
  id: string;
  MenuName: string;
  Icon: string;
  Priority: number;
  SubMenus: SubMenu[];
}

export default function RemoveAccessClient({ id }: { id: string }) {
  const token = getCookie("login-token");

  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuAccess, setMenuAccess] = useState<{ [key: string]: boolean }>({});
  const [submenuAccess, setSubmenuAccess] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenus() {
      setLoading(true);
      if (!token || !id) {
        setLoading(false);
        return;
      }

      const result = await GetAccessSideBar(token, id);

      setMenus(result?.menus || []);

      if (result?.menus) {
        const menuMap: { [key: string]: boolean } = {};
        const submenuMap: { [key: string]: boolean } = {};
        result.menus.forEach((menu: Menu) => {
          menuMap[menu.id] = true;
          menu.SubMenus.forEach((sub: SubMenu) => {
            submenuMap[sub.id] = true;
          });
        });
        setMenuAccess(menuMap);
        setSubmenuAccess(submenuMap);
      }
      setLoading(false);
    }
    fetchMenus();
  }, [id, token]);

  const toggleMenuAccess = (menuId: string) => {
    setMenuAccess((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const toggleSubmenuAccess = (submenuId: string) => {
    setSubmenuAccess((prev) => ({
      ...prev,
      [submenuId]: !prev[submenuId],
    }));
  };

  // Function to collect the selected menu and submenu ids and call the API
  const handleSave = async () => {
    if (!token || !id) {
      alert("User authentication or ID missing");
      return;
    }

    const selectedMenuIds = Object.entries(menuAccess)
      .filter(([_, hasAccess]) => !hasAccess) // false means access removed, per your controller deleting those IDs
      .map(([menuId]) => menuId);

    const selectedSubmenuIds = Object.entries(submenuAccess)
      .filter(([_, hasAccess]) => !hasAccess) // false means access removed
      .map(([submenuId]) => submenuId);

    if (selectedMenuIds.length === 0 && selectedSubmenuIds.length === 0) {
      alert("No access to remove. Please toggle off the items you want to remove access from.");
      return;
    }

    try {
      setLoading(true);
      const response=await RemoveSubMenu(token as string,selectedMenuIds,selectedSubmenuIds,id);
      // const response = await axios.post(
      //   "/api/remove-access", // Replace with your actual API endpoint
      //   {
      //     userId: id,
      //     menuIds: selectedMenuIds,
      //     submenuIds: selectedSubmenuIds,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      if (response.success) {
        alert(response.message || "Access removed successfully");
        // Optionally refresh or update UI here
      } else {
        alert("Failed to remove access: " + (response.message || ""));
      }
    } catch (error: any) {
      alert("Error removing access: " + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card className="max-w-3xl mx-auto p-6 rounded-lg shadow-md">
      <CardHeader className="mb-6 text-center text-2xl font-bold">User Access Settings</CardHeader>
      <CardContent>
        {menus.map((menu) => (
          <div key={menu.id} className="mb-4">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">{menu.MenuName}</Label>
              <Switch
                checked={!!menuAccess[menu.id]}
                onCheckedChange={() => toggleMenuAccess(menu.id)}
              />
            </div>
            <div className="ml-6 mt-2">
              {menu.SubMenus?.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between mb-2">
                  <Label>{sub.SubMenuName}</Label>
                  <Switch
                    checked={!!submenuAccess[sub.id]}
                    onCheckedChange={() => toggleSubmenuAccess(sub.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button className="mt-8 float-right" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </CardContent>
    </Card>
  );
}
