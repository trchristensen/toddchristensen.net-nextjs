import type { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res:NextResponse) {
  const { nextUrl: url, geo, ip } = req;
}
