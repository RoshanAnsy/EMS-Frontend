import { Calendar,GitPullRequestDraft, Home,BadgePlus ,Baby , Inbox, Search, Settings } from "lucide-react"
import { GetSideMenu } from "@/api/appsidebar";
import { getCookie, getCookies, hasCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';
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
  
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"


// Menu items
// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//     subItems: [
//       { title: "Overview", url: "#" },
//       { title: "Stats", url: "#" },
//     ],
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//     subItems: [
//       { title: "All Messages", url: "#" },
//       { title: "Unread", url: "#" },
//     ],
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ]

export async function AppSidebar() {
  const token = await getCookie('login-token', { cookies });
  const GetMenu=await GetSideMenu(token as string);
  console.log("Get side menu list",GetMenu);
  const Menu: any[] = GetMenu?.menus || [] 
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Menu?.map((item,index) => (
                <Collapsible key={index} defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <span >
                          <item.Icon className="mr-2 h-4 w-4 text-black" />
                          <span className="font-bold">{item?.MenuName}</span>
                        </span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {item.SubMenus && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item?.SubMenus.map((subItem:any, index:number) => (
                            <SidebarMenuSubItem key={index}>
                              <a href={subItem?.Routes}>{subItem.SubMenuName}</a>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
