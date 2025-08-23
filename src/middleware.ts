import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface decodeTypes{
    isUserExist: { 
        role: "USER" | "ADMIN";
        name: string;
        password: '',
        email: string;
        id: number;
        
      },
        iat: number;
        exp: number;
    };

export function middleware(req: NextRequest) {
  const token = req.cookies.get("login-token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded: decodeTypes = jwtDecode(token);
    const userRole = decoded?.isUserExist?.role;
    
    // Restrict /admin route to only ADMIN users
    if (req.nextUrl.pathname.startsWith("/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/view/:path*",],
};
