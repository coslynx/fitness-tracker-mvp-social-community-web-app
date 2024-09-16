"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { useUser } from "@/lib/hooks/useUser";
import { Activity } from "@/types";
import { getActivitiesByUserId } from "@/lib/prisma/activities";
import { formatDate } from "@/lib/utils/formatters";

export const useActivities = () => {
  const { user } = useUser();
  const { setActivities } = useStore();
  const [activities, setActivitiesState] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      if (user) {
        const activities = await getActivitiesByUserId(user.id);
        setActivities(activities);
        setActivitiesState(activities);
      }
      setIsLoading(false);
    };

    fetchActivities();
  }, [user]);

  const createActivity = async (activity: Activity) => {
    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      });

      if (response.ok) {
        const newActivity = await response.json();
        setActivitiesState([newActivity, ...activities]);
      }
    } catch (error) {
      console.error("Error creating activity", error);
    }
  };

  const updateActivity = async (activity: Activity) => {
    try {
      const response = await fetch(`/api/activities/${activity.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      });

      if (response.ok) {
        const updatedActivity = await response.json();
        const updatedActivities = activities.map((a) =>
          a.id === updatedActivity.id ? updatedActivity : a
        );
        setActivitiesState(updatedActivities);
      }
    } catch (error) {
      console.error("Error updating activity", error);
    }
  };

  const deleteActivity = async (id: number) => {
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setActivitiesState(activities.filter((a) => a.id !== id));
      }
    } catch (error) {
      console.error("Error deleting activity", error);
    }
  };

  const formatDateHelper = (date: Date) => formatDate(date);

  return {
    activities,
    isLoading,
    createActivity,
    updateActivity,
    deleteActivity,
    formatDate: formatDateHelper,
  };
};