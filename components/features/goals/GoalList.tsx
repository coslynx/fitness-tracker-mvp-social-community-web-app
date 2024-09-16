"use client";

import { useGoals } from "@/lib/hooks/useGoals";
import { useUser } from "@/lib/hooks/useUser";
import { Card, Button, Input } from "@/components/ui";
import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils/formatters";
import { Goal } from "@/types";

export default function GoalList() {
  const { user } = useUser();
  const { goals, deleteGoal } = useGoals();
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);

  const handleGoalClick = (goal: Goal) => {
    setActiveGoal(goal);
  };

  const handleCloseGoalModal = () => {
    setActiveGoal(null);
  };

  const handleDeleteGoal = async (id: number) => {
    await deleteGoal(id);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Your Goals</h2>
      <div className="flex flex-col gap-2">
        {goals?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals?.map((goal) => (
              <Card
                key={goal.id}
                className="cursor-pointer"
                onClick={() => handleGoalClick(goal)}
              >
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold">{goal.type}</h4>
                  <p>Target: {goal.targetValue}</p>
                  <p>Start Date: {formatDate(goal.startDate)}</p>
                  <p>End Date: {formatDate(goal.endDate)}</p>
                  <p>Progress: {goal.progress}%</p>
                </div>
                <Button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            You don't have any goals yet. Create your first goal by clicking "Add Goal" above.
          </p>
        )}
      </div>
      {activeGoal && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4">
          <h3 className="text-xl font-bold mb-4">
            {activeGoal.type} Goal Details
          </h3>
          <div className="flex flex-col gap-2">
            <p>Target: {activeGoal.targetValue}</p>
            <p>Start Date: {formatDate(activeGoal.startDate)}</p>
            <p>End Date: {formatDate(activeGoal.endDate)}</p>
            <p>Progress: {activeGoal.progress}%</p>
            <Button onClick={handleCloseGoalModal}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}