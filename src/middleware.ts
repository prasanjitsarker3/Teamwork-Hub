/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// Define home route for unauthenticated users and the base private routes for each role
const AuthRoutes = ["/"]; // Home route
const roleBasePrivateRoute = {
  user: [/^\/dashboard/], // User should only access /dashboard routes
  admin: [/^\/admin/], // Admin should only access /admin routes
  modaretor: [/^\/modaretor/], // Moderator should only access /modaretor routes
};

type Role = keyof typeof roleBasePrivateRoute;

// Middleware function to handle role-based routing
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get("accessToken")?.value;

  // If no access token is found, redirect to home ("/") unless it's already the home route
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next(); // Allow access to the home route
    } else {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect to home if accessing private routes without a token
    }
  }

  // Decode the JWT token to get user data
  let decodedData: any = null;
  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role: Role | undefined = decodedData?.role;

  // If authenticated user tries to access the home route ("/"), redirect to their last valid route
  if (accessToken && AuthRoutes.includes(pathname)) {
    if (role && roleBasePrivateRoute[role]) {
      // Redirect to last valid role-based route
      const redirectTo =
        role === "admin"
          ? "/admin"
          : role === "modaretor"
          ? "/modaretor"
          : "/dashboard";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }
  // Track previous valid route for the role
  let previousValidRoute: string | null = null;

  // If role exists, check if the route is accessible by the role
  if (role && roleBasePrivateRoute[role]) {
    const routes = roleBasePrivateRoute[role];
    if (routes.some((route) => route.test(pathname))) {
      previousValidRoute = pathname; // Store the valid route for the role
      return NextResponse.next(); // Allow access to valid role-specific routes
    } else {
      // Redirect to previous valid route if an unauthorized route is attempted
      if (previousValidRoute) {
        return NextResponse.redirect(new URL(previousValidRoute, request.url)); // Redirect to last valid route
      } else {
        // If no previous valid route, redirect to default role-based route
        const fallbackRoute =
          role === "admin"
            ? "/admin"
            : role === "modaretor"
            ? "/modaretor"
            : "/dashboard";
        return NextResponse.redirect(new URL(fallbackRoute, request.url));
      }
    }
  }

  // Default redirection to home if no valid role or path is matched
  return NextResponse.redirect(new URL("/", request.url));
}

// Define the routes to apply middleware on
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/modaretor/:path*"], // Role-based route matching
};
