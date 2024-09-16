"use client";

import { useState } from "react";
import { useActivities } from "@/lib/hooks/useActivities";
import { useUser } from "@/lib/hooks/useUser";
import { Input, Button, Modal } from "@/components/ui";
import { Activity } from "@/types";
import { useRouter } from "next/navigation";

export default function ActivityForm() {
  const { user } = useUser();
  const { createActivity, updateActivity, setActiveActivity, activeActivity } =
    useActivities();
  const [type, setType] = useState(activeActivity?.type || "");
  const [duration, setDuration] = useState(activeActivity?.duration || 0);
  const [caloriesBurned, setCaloriesBurned] =
    useState(activeActivity?.caloriesBurned || 0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (activeActivity) {
        await updateActivity({
          id: activeActivity.id,
          type,
          duration,
          caloriesBurned,
        });
        setActiveActivity(null);
      } else {
        await createActivity({
          type,
          duration,
          caloriesBurned,
          userId: user?.id,
        });
      }

      router.push("/activities");
    } catch (error) {
      console.error("Error creating or updating activity", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">
        {activeActivity ? "Edit Activity" : "Log Activity"}
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
        <label htmlFor="duration">Duration (minutes):</label>
        <Input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="caloriesBurned">Calories Burned:</label>
        <Input
          id="caloriesBurned"
          type="number"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(parseInt(e.target.value))}
        />
      </div>
      <Button type="submit">
        {activeActivity ? "Update Activity" : "Log Activity"}
      </Button>
    </form>
  );
}