// app/api/auth/login/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default-secret";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  console.log(body, "1");

  if (!email || !password) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({
      "User Doesn't eexist": { status: 401 },
    });
  }
  console.log(user, "2");
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return new NextResponse("Invalid credentials", { status: 401 });
  }
  console.log(isPasswordCorrect, "2");
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: MAX_AGE,
  });

  const cookie = serialize("session-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = NextResponse.json({
    message: "Logged in successfully",
  });
  response.headers.set("Set-Cookie", cookie);

  return response;
}
