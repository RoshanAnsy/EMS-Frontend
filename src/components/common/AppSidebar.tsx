

import * as Icons from "lucide-react";
import UserProfile from '../user/UserProfile';
import { GetSideMenu } from "@/api/appsidebar";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

export async function AppSidebar() {
  const token = await getCookie("login-token", { cookies });
  console.log("token on server side", token);

  const GetMenu = await GetSideMenu(token as string);
  console.log("Get side menu list", GetMenu);

  const Menu: any[] = GetMenu?.menus || [];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className=" font-bold text-lg border-l-purple-500 border-l-4  mb-2">URV FORTUNE PVT.LTD</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Menu?.map((item, index) => {
                // resolve icon here
                const IconComponent = Icons[item.Icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;


                return (
                  <Collapsible
                    key={index}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <span>
                            {IconComponent && (
                              <IconComponent className="mr-2 h-4 w-4 text-black" />
                            )}
                            <span className="font-bold">
                              {item?.MenuName}
                            </span>
                          </span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      {item.SubMenus && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item?.SubMenus.map(
                              (subItem: any, subIndex: number) => (
                                <SidebarMenuSubItem key={subIndex}>
                                  <a href={subItem?.Routes}>
                                    {subItem.SubMenuName}
                                  </a>
                                </SidebarMenuSubItem>
                              )
                            )}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
          
        </SidebarGroup>
        
      </SidebarContent>
       <SidebarGroupLabel className=" font-bold text-lg border-l-purple-500 border-l-4 rounded-none ml-1 mb-8"><UserProfile/></SidebarGroupLabel>
    </Sidebar>
  );
}
