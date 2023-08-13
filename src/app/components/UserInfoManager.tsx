import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { UserInfoManagerClient } from "./UserInfoManagerClient";

interface UserInfoManagerProps {
  discordUserData: {
    message: string;
    userId: string;
    isUserAdmin: boolean;
    isUserPlayer: boolean;
    isUserAquiles: boolean;
  };
}
export async function UserInfoManager({
  discordUserData,
}: UserInfoManagerProps) {
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const session = await getServerSession(authOptions);

  if (!session) return <></>;

  const dataFetch = {
    username: session?.user?.name,
    avatar: session?.user?.image,
    isUserAdmin: discordUserData.isUserAdmin,
    discordId: discordUserData.userId,
  };

  let url = "";
  if (discordUserData.isUserPlayer) {
    url = `${publicApiUrl}/register/player`;
  }
  if (discordUserData.isUserAquiles) {
    url = `${publicApiUrl}/register/aquiles`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataFetch),
  });
  if (response.status !== 200) return <></>;
  const data = await response.json();
  return <UserInfoManagerClient data={data} />;
}
