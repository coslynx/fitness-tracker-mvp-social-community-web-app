"use server";

import { createUser } from "@/lib/prisma/users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { json } from "react";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        JSON.stringify({
          message: "Unauthorized",
        }),
        { status: 401 }
      );
    }

    const { name, email, password } = await req.json();

    const user = await createUser({
      name,
      email,
      password,
    });

    return json(user);
  } catch (error) {
    console.error("Error creating user", error);
    return new Response(
      JSON.stringify({
        message: "Error creating user",
      }),
      { status: 500 }
    );
  }
}