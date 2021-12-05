import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  console.log("GEO LOCATION OBJ ===>", geo)
}
