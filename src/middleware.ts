import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|img).*)"],
};

export default auth((req) => {
  const reqUrl = new URL(req.url);

  const allowedPaths = ["/", "/about"];

  if (!req.auth && !allowedPaths.includes(reqUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});
