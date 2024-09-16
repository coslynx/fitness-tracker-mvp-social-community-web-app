"use client";

import { useState } from "react";
import { useUser } from "@/lib/hooks/useUser";
import { Input, Button, Modal } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function SignupForm() {
  const { user, setUser } = useUser();
  const { setIsAuthModalOpen } = useStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
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
      console.error("Error signing up", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name:</label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
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
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <Button type="submit">Sign Up</Button>
    </form>
  );
}