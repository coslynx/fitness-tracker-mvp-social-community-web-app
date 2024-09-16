"use client";

import { useActivities } from "@/lib/hooks/useActivities";
import { useUser } from "@/lib/hooks/useUser";
import { Card, Button, Input } from "@/components/ui";
import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils/formatters";
import { Activity } from "@/types";
import { useRouter } from "next/navigation";

export default function ActivityList() {
  const { user } = useUser();
  const { activities, deleteActivity } = useActivities();
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);
  const router = useRouter();

  const handleActivityClick = (activity: Activity) => {
    setActiveActivity(activity);
  };

  const handleCloseActivityModal = () => {
    setActiveActivity(null);
  };

  const handleDeleteActivity = async (id: number) => {
    await deleteActivity(id);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Your Activities</h2>
      <div className="flex flex-col gap-2">
        {activities?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities?.map((activity) => (
              <Card
                key={activity.id}
                className="cursor-pointer"
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold">{activity.type}</h4>
                  <p>Duration: {activity.duration} minutes</p>
                  <p>Calories Burned: {activity.caloriesBurned}</p>
                  <p>Date: {formatDate(activity.createdAt)}</p>
                </div>
                <Button
                  onClick={() => handleDeleteActivity(activity.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            You don't have any activities yet. Create your first activity by
            clicking "Log Activity" above.
          </p>
        )}
      </div>
      {activeActivity && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4">
          <h3 className="text-xl font-bold mb-4">
            {activeActivity.type} Activity Details
          </h3>
          <div className="flex flex-col gap-2">
            <p>Duration: {activeActivity.duration} minutes</p>
            <p>Calories Burned: {activeActivity.caloriesBurned}</p>
            <p>Date: {formatDate(activeActivity.createdAt)}</p>
            <Button onClick={handleCloseActivityModal}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}