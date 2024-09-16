"use server";

import { createGoal } from "@/lib/prisma/goals";
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

    const { type, targetValue, startDate, endDate } = await req.json();

    const goal = await createGoal({
      type,
      targetValue,
      startDate,
      endDate,
      userId: session.user.id,
    });

    return json(goal);
  } catch (error) {
    console.error("Error creating goal", error);
    return new Response(
      JSON.stringify({
        message: "Error creating goal",
      }),
      { status: 500 }
    );
  }
}