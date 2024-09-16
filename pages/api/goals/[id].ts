"use server";

import { getGoalById } from "@/lib/prisma/goals";
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

    const goal = await getGoalById(params.id);

    if (!goal) {
      return new Response(
        JSON.stringify({
          message: "Goal not found",
        }),
        { status: 404 }
      );
    }

    return json(goal);
  } catch (error) {
    console.error("Error fetching goal", error);
    return new Response(
      JSON.stringify({
        message: "Error fetching goal",
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

    const { type, targetValue, startDate, endDate } = await req.json();

    const goal = await getGoalById(params.id);

    if (!goal) {
      return new Response(
        JSON.stringify({
          message: "Goal not found",
        }),
        { status: 404 }
      );
    }

    const updatedGoal = await prisma.goal.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        type,
        targetValue,
        startDate,
        endDate,
      },
    });

    return json(updatedGoal);
  } catch (error) {
    console.error("Error updating goal", error);
    return new Response(
      JSON.stringify({
        message: "Error updating goal",
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const goal = await getGoalById(params.id);

    if (!goal) {
      return new Response(
        JSON.stringify({
          message: "Goal not found",
        }),
        { status: 404 }
      );
    }

    await prisma.goal.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return new Response(
      JSON.stringify({
        message: "Goal deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting goal", error);
    return new Response(
      JSON.stringify({
        message: "Error deleting goal",
      }),
      { status: 500 }
    );
  }
}