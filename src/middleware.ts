import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Use jose instead of jsonwebtoken

interface DecodedToken {
  userId: string;
  role: string;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // console.log("Token in middleware:", token);

  if (!token) {
    // console.log("No token found in cookies");
    return NextResponse.redirect(new URL("/login-user", req.nextUrl.origin));
  }

  try {
    // Use jose to verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (typeof payload === "string" || !("userId" in payload)) {
      throw new Error("Invalid token structure");
    }
    const { userId, role } = payload as unknown as DecodedToken;

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", userId.toString());

    // redirect based on role
    if (role === "ADMIN") {
      // Allow access to the requested route
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } else if (role === "STUDENT") {
      // Allow access to the requested route
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } else {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  } catch (error) {
    console.log("Token verification error:", error);
    return NextResponse.redirect(new URL("/login-user", req.nextUrl.origin));
  }
}

export const config = {
  matcher: ["/users/:path*", "/admin/:path*"], // Simplified matcher
};
