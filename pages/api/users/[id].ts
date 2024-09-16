"use server";

import { getUserById } from "@/lib/prisma/users";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { json } from "react";

export async function GET(req: Request, { params }: { params: { id: string } }) {
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

    const user = await getUserById(params.id);

    if (!user) {
      return new Response(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    return json(user);
  } catch (error) {
    console.error("Error fetching user", error);
    return new Response(
      JSON.stringify({
        message: "Error fetching user",
      }),
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const { name, email } = await req.json();

    const user = await getUserById(params.id);

    if (!user) {
      return new Response(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name,
        email,
      },
    });

    return json(updatedUser);
  } catch (error) {
    console.error("Error updating user", error);
    return new Response(
      JSON.stringify({
        message: "Error updating user",
      }),
      { status: 500 }
    );
  }
}