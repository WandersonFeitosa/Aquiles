"use client";

import { useEffect } from "react";

export function UserInfoManagerClient(data: any) {
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(data));
  }, [data]);
  return <></>;
}
