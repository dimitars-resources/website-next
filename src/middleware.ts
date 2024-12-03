import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|img).*)"],
};

export default auth((req) => {
  const reqUrl = new URL(req.url);

  const allowedPaths = ["/", "/about"];
  const adminPaths = ["/dashboard"];

  if (!req.auth) {
    if (!allowedPaths.includes(reqUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (adminPaths.includes(reqUrl.pathname)) {
      if (!req.auth?.user.isAdmin === true) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }
});
