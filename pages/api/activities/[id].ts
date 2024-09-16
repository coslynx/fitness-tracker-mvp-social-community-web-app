"use server";

import { getActivityById } from "@/lib/prisma/activities";
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

    const activity = await getActivityById(params.id);

    if (!activity) {
      return new Response(
        JSON.stringify({
          message: "Activity not found",
        }),
        { status: 404 }
      );
    }

    return json(activity);
  } catch (error) {
    console.error("Error fetching activity", error);
    return new Response(
      JSON.stringify({
        message: "Error fetching activity",
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

    const { type, duration, caloriesBurned } = await req.json();

    const activity = await getActivityById(params.id);

    if (!activity) {
      return new Response(
        JSON.stringify({
          message: "Activity not found",
        }),
        { status: 404 }
      );
    }

    const updatedActivity = await prisma.activity.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        type,
        duration,
        caloriesBurned,
      },
    });

    return json(updatedActivity);
  } catch (error) {
    console.error("Error updating activity", error);
    return new Response(
      JSON.stringify({
        message: "Error updating activity",
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

    const activity = await getActivityById(params.id);

    if (!activity) {
      return new Response(
        JSON.stringify({
          message: "Activity not found",
        }),
        { status: 404 }
      );
    }

    await prisma.activity.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return new Response(
      JSON.stringify({
        message: "Activity deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting activity", error);
    return new Response(
      JSON.stringify({
        message: "Error deleting activity",
      }),
      { status: 500 }
    );
  }
}