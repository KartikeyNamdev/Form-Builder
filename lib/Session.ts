// lib/session.ts
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getCurrentUser() {
  const token = (await cookies()).get("session-token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.userId as string;

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      // Select only the fields you need for security
      select: { id: true, name: true, email: true },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
