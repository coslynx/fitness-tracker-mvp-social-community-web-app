"use client";

import { useState } from "react";
import { useUser } from "@/lib/hooks/useUser";
import { Input, Button, Modal } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function LoginForm() {
  const { user, setUser } = useUser();
  const { setIsAuthModalOpen } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthModalOpen(false);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Login</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email:</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password:</label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
}