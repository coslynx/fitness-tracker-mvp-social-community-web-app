"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { useUser } from "@/lib/hooks/useUser";
import { Goal } from "@/types";
import { getGoalsByUserId } from "@/lib/prisma/goals";
import { formatDate } from "@/lib/utils/formatters";

export const useGoals = () => {
  const { user } = useUser();
  const { setGoals } = useStore();
  const [goals, setGoalsState] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      if (user) {
        const goals = await getGoalsByUserId(user.id);
        setGoals(goals);
        setGoalsState(goals);
      }
      setIsLoading(false);
    };

    fetchGoals();
  }, [user]);

  const createGoal = async (goal: Goal) => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goal),
      });

      if (response.ok) {
        const newGoal = await response.json();
        setGoalsState([newGoal, ...goals]);
      }
    } catch (error) {
      console.error("Error creating goal", error);
    }
  };

  const updateGoal = async (goal: Goal) => {
    try {
      const response = await fetch(`/api/goals/${goal.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goal),
      });

      if (response.ok) {
        const updatedGoal = await response.json();
        const updatedGoals = goals.map((g) =>
          g.id === updatedGoal.id ? updatedGoal : g
        );
        setGoalsState(updatedGoals);
      }
    } catch (error) {
      console.error("Error updating goal", error);
    }
  };

  const deleteGoal = async (id: number) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setGoalsState(goals.filter((g) => g.id !== id));
      }
    } catch (error) {
      console.error("Error deleting goal", error);
    }
  };

  const formatDateHelper = (date: Date) => formatDate(date);

  return {
    goals,
    isLoading,
    createGoal,
    updateGoal,
    deleteGoal,
    setActiveGoal,
    activeGoal,
    formatDate: formatDateHelper,
  };
};