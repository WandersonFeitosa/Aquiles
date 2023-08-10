"use client";

import { useEffect } from "react";

interface UserInfoManagerProps {
  discordUserData: {
    message: string;
    userId: string;
    isUserAdmin: boolean;
    isUserPlayer: boolean;
    isUserAquiles: boolean;
  };
}
export function UserInfoManager({ discordUserData }: UserInfoManagerProps) {
  useEffect(() => {
    if (discordUserData.isUserAdmin) {
      sessionStorage.setItem("isUserAdmin", "true");
    } else {
      sessionStorage.setItem("isUserAdmin", "false");
    }
    if (discordUserData.isUserPlayer) {
      sessionStorage.setItem("isUserPlayer", "true");
    } else {
      sessionStorage.setItem("isUserPlayer", "false");
    }
    if (discordUserData.isUserAquiles) {
      sessionStorage.setItem("isUserAquiles", "true");
    } else {
      sessionStorage.setItem("isUserAquiles", "false");
    }

    sessionStorage.setItem("userId", discordUserData.userId);
  }, [discordUserData]);
  return <></>;
}
