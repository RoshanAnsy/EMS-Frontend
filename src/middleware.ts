import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface decodeTypes {
  isUserExist: {
    role: "USER" | "ADMIN";
    name: string;
    password: string;
    email: string;
    id: number;
  };
  iat: number;
  exp: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("login-token")?.value;
  const { pathname } = req.nextUrl;

  // 🔒 If no token -> redirect to /login (all routes private)
  if (!token) {
    if (pathname === "/login") return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ✅ Decode JWT safely (Edge-compatible)
    const decoded: decodeTypes = jwtDecode(token);

    // ✅ Check token expiration (based on 'exp' from jwt.sign)
    if (decoded.exp * 1000 < Date.now()) {
      // Token expired — clear cookie + redirect to /login
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("login-token");
      return res;
    }

    const userRole = decoded?.isUserExist?.role;

    // ✅ Logged-in users visiting "/" or "/login" → redirect to /view/attendance
    if (pathname === "/" || pathname === "/login") {
      return NextResponse.redirect(new URL("/view/attendance", req.url));
    }

    // ✅ Restrict /admin routes to ADMIN role
    if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",            // root
    "/login",       // login
    "/view/:path*", // view routes
    "/admin/:path*" // admin routes
  ],
};
