"use client";

import Link from "next/link";
import { useUser } from "@/lib/hooks/useUser";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui";
import { useState } from "react";

export default function Footer() {
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
    <footer className="bg-gray-100 p-4 fixed bottom-0 left-0 right-0 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-gray-700 text-sm">
          &copy; 2023 Fitness Tracker. All rights reserved.
        </p>
        <nav className="flex gap-4">
          {user && (
            <Button onClick={() => setShowLogoutModal(true)}>Logout</Button>
          )}
          {!user && (
            <>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Signup</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
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
    </footer>
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