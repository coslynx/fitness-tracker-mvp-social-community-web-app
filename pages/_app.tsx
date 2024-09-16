"use client";

import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { useUser } from "@/lib/hooks/useUser";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useStore();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const serverSession = await getServerSession(authOptions);
      setSession(serverSession);
      setUser(serverSession?.user);
    };

    fetchSession();
  }, []);

  return (
    <html lang="en">
      <body>
        {session && (
          <SessionProvider session={session}>{children}</SessionProvider>
        )}
      </body>
    </html>
  );
}