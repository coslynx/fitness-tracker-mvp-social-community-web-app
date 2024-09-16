"use server";

import { createActivity } from "@/lib/prisma/activities";
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

    const { type, duration, caloriesBurned } = await req.json();

    const activity = await createActivity({
      type,
      duration,
      caloriesBurned,
      userId: session.user.id,
    });

    return json(activity);
  } catch (error) {
    console.error("Error creating activity", error);
    return new Response(
      JSON.stringify({
        message: "Error creating activity",
      }),
      { status: 500 }
    );
  }
}