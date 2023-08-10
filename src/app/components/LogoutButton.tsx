"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut();
  };

  return <button className="logoutButton" onClick={handleLogout}>Logout</button>;
}
