import React, {ReactNode} from 'react'
import Navbar from '@/components/common/Navbar';
import { Inter } from 'next/font/google'
import type { Metadata } from "next";
const inter = Inter({ subsets: ['latin'] })
import BillStatus from '@/components/common/BillStatus';
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/common/AppSidebar"

export const metadata: Metadata = {
  title: "Biller",
  description: "search your topics",
  icons:"icon.png"
};
const layout = ({ children }: { children: ReactNode }) => {

  return (
    <div className={inter.className} >
      {/* <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider> */}
      {/* <Navbar>
          {
          <div className="w-full flex flex-col gap-y-4 p-4 ">
            <BillStatus/>
              {children}
            </div>
          }
          </Navbar> */}
    </div>
  )
}

export default layout
