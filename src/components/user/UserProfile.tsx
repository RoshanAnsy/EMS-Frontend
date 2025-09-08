import { getCookie, deleteCookie } from "cookies-next"
import { cookies } from "next/headers"
import { GetUser } from "@/api/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" 
type UserDetail = {
  name: string
  email: string
}

export default async function UserProfile() {
  const token = await getCookie("login-token", { cookies })
  if (!token) {
    redirect("/login")
  }

  const response = await GetUser(token as string)
  const user: UserDetail = response.result

  async function logout() {
    "use server"
    deleteCookie("login-token", { cookies })
    redirect("/login")
  }

  const avatarInitial = user?.name?.length ? user.name[0].toUpperCase() : "U"

  return (
     <Popover>
      <PopoverTrigger>
        <div className="flex gap-x-2">
          <span>{user?.name || "Unknown User"}</span>
          <p className="flex w-6 h-6 cursor-pointer text-black bg-[#6EE7B7] rounded-full p-4 items-center text-center justify-center">
            
            {avatarInitial}
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-y-4">
        <div className="flex items-center gap-8 shadow-none">
          <p className="flex w-6 h-6 text-black bg-[#6EE7B7] rounded-full p-4 items-center justify-center">
            {avatarInitial}
          </p>
          <p className="flex flex-col items-start">
            <span>{user?.name || "Unknown User"}</span>
            <span className="text-gray-500">{user?.email || "No email"}</span>
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <Button variant="secondary" className="cursor-pointer" onClick={logout}>
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
