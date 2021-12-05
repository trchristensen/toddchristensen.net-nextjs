import type { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res:NextResponse) {
  const { nextUrl: url, geo, ip } = req;

  res.headers.set('x-user-ip', req.ip)
  res.headers.set("x-city-set", geo.city);
  res.headers.set("x-region-set", geo.region);
  res.headers.set("x-country-set", geo.country);
  
}
