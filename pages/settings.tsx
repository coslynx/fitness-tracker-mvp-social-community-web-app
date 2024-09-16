"use client";

import { useState } from "react";
import { useUser } from "@/lib/hooks/useUser";
import { useStore } from "@/lib/store";
import { Input, Button, Modal } from "@/components/ui";

export default function Settings() {
  const { user } = useUser();
  const { setUser } = useStore();
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
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

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/users/" + user?.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile", error);
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setShowChangePasswordModal(false);
        alert("Password updated successfully!");
      } else {
        console.error("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Account Settings</h2>

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

      <Button onClick={handleSubmit}>Save Changes</Button>

      <Button onClick={() => setShowChangePasswordModal(true)}>
        Change Password
      </Button>

      <Modal open={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)}>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">Change Password</h3>
          <label htmlFor="password">New Password:</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <Button onClick={handlePasswordSubmit}>Save Changes</Button>
      </Modal>
    </div>
  );
}