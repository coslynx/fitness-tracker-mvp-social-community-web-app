"use client";

import Link from "next/link";
import { useUser } from "@/lib/hooks/useUser";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui";
import { useState } from "react";

export default function Sidebar() {
  const { user } = useUser();
  const { setUser } = useStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        setUser(null);
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="bg-gray-100 p-4 fixed top-0 left-0 bottom-0 w-64 shadow-md overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Fitness Tracker Logo"
            className="w-12 h-12 rounded-full"
          />
          <h2 className="text-xl font-bold">Fitness Tracker</h2>
        </div>

        <nav className="flex flex-col gap-2">
          <Link href="/dashboard">
            <Button className="w-full">Dashboard</Button>
          </Link>
          <Link href="/goals">
            <Button className="w-full">Goals</Button>
          </Link>
          <Link href="/activities">
            <Button className="w-full">Activities</Button>
          </Link>
          <Link href="/settings">
            <Button className="w-full">Settings</Button>
          </Link>
        </nav>

        <Button onClick={() => setShowLogoutModal(true)} className="w-full">
          Logout
        </Button>

        <Modal
          open={showLogoutModal}
          onClose={handleCloseLogoutModal}
          title="Logout"
          description="Are you sure you want to logout?"
        >
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
            Logout
          </Button>
          <Button onClick={handleCloseLogoutModal} className="bg-gray-500 hover:bg-gray-600">
            Cancel
          </Button>
        </Modal>
      </div>
    </div>
  );
}

const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}) => {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md shadow-md p-6 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        {children}
      </div>
    </div>
  );
};