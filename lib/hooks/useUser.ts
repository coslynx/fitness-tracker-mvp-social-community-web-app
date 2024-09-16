"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";

export const useUser = () => {
  const { setUser } = useStore();
  const [user, setUserState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const session = await getServerSession(authOptions);
        if (session) {
          setUser(session.user);
          setUserState(session.user);
        }
      } catch (error) {
        console.error("Error fetching user", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading };
};