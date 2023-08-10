"use client";

import { useEffect } from "react";

interface UserInfoManagerProps {
  discordUserData: {
    message: string;
    isUserAdmin: boolean;
    userId: string;
  };
}
export function UserInfoManager({ discordUserData }: UserInfoManagerProps) {
  useEffect(() => {
    if (discordUserData.isUserAdmin) {
      sessionStorage.setItem("isUserAdmin", "true");
    } else {
      sessionStorage.setItem("isUserAdmin", "false");
    }
    sessionStorage.setItem("userId", discordUserData.userId);
  }, [discordUserData]);
  return <></>;
}
