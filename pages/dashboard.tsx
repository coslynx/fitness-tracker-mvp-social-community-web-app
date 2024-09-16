"use client";

import { useUser } from "@/lib/hooks/useUser";
import { useStore } from "@/lib/store";
import { Card, Button, Input } from "@/components/ui";
import { useState, useEffect } from "react";
import { useGoals } from "@/lib/hooks/useGoals";
import { useActivities } from "@/lib/hooks/useActivities";
import { formatDate } from "@/lib/utils/formatters";
import { Goal } from "@/types";

export default function Dashboard() {
  const { user } = useUser();
  const { goals } = useGoals();
  const { activities } = useActivities();
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);

  const handleGoalClick = (goal: Goal) => {
    setActiveGoal(goal);
  };

  const handleCloseGoalModal = () => {
    setActiveGoal(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        Welcome,{" "}
        {user?.name
          ? user?.name
          : "Guest"}
      </h2>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Your Active Goals</h3>
        {goals?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals?.map((goal) => (
              <Card
                key={goal.id}
                className="cursor-pointer"
                onClick={() => handleGoalClick(goal)}
              >
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold">
                    {goal.type}
                  </h4>
                  <p>
                    Target: {goal.targetValue}
                  </p>
                  <p>
                    Start Date: {formatDate(goal.startDate)}
                  </p>
                  <p>
                    End Date: {formatDate(goal.endDate)}
                  </p>
                  <p>
                    Progress: {goal.progress}%
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No active goals yet. Click "Add Goal" to set your first goal.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Your Recent Activities</h3>
        {activities?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities?.map((activity) => (
              <Card key={activity.id}>
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold">
                    {activity.type}
                  </h4>
                  <p>
                    Duration: {activity.duration} minutes
                  </p>
                  <p>
                    Calories Burned: {activity.caloriesBurned}
                  </p>
                  <p>
                    Date: {formatDate(activity.createdAt)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No recent activities yet. Click "Log Activity" to add your first activity.
          </p>
        )}
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => {
            router.push("/goals");
          }}
        >
          Add Goal
        </Button>
        <Button
          onClick={() => {
            router.push("/activities");
          }}
        >
          Log Activity
        </Button>
      </div>
      {activeGoal && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4">
          <h3 className="text-xl font-bold mb-4">
            {activeGoal.type} Goal Details
          </h3>
          <div className="flex flex-col gap-2">
            <p>
              Target: {activeGoal.targetValue}
            </p>
            <p>
              Start Date: {formatDate(activeGoal.startDate)}
            </p>
            <p>
              End Date: {formatDate(activeGoal.endDate)}
            </p>
            <p>
              Progress: {activeGoal.progress}%
            </p>
            <Button onClick={handleCloseGoalModal}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}