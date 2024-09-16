"use client";

import { useState } from "react";
import { useGoals } from "@/lib/hooks/useGoals";
import { useUser } from "@/lib/hooks/useUser";
import { Input, Button, Modal } from "@/components/ui";
import { Goal } from "@/types";
import { useRouter } from "next/navigation";

export default function GoalForm() {
  const { user } = useUser();
  const { createGoal, updateGoal, setActiveGoal, activeGoal } = useGoals();
  const [type, setType] = useState(activeGoal?.type || "");
  const [targetValue, setTargetValue] = useState(activeGoal?.targetValue || 0);
  const [startDate, setStartDate] = useState(activeGoal?.startDate || "");
  const [endDate, setEndDate] = useState(activeGoal?.endDate || "");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (activeGoal) {
        await updateGoal({
          id: activeGoal.id,
          type,
          targetValue,
          startDate,
          endDate,
        });
        setActiveGoal(null);
      } else {
        await createGoal({
          type,
          targetValue,
          startDate,
          endDate,
          userId: user?.id,
        });
      }

      router.push("/goals");
    } catch (error) {
      console.error("Error creating or updating goal", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">
        {activeGoal ? "Edit Goal" : "Add Goal"}
      </h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="type">Type:</label>
        <Input
          id="type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="targetValue">Target Value:</label>
        <Input
          id="targetValue"
          type="number"
          value={targetValue}
          onChange={(e) => setTargetValue(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="startDate">Start Date:</label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="endDate">End Date:</label>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <Button type="submit">{activeGoal ? "Update Goal" : "Create Goal"}</Button>
    </form>
  );
}