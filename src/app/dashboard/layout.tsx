import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { getServerSession } from "next-auth";
import { authOptions, useLoginRequiredServer } from "@/lib/auth";
import LogoutButton from "../components/LogoutButton";
import { UserInfoManager } from "../components/UserInfoManager";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  await useLoginRequiredServer();
  const botUrl = process.env.NEXT_PUBLIC_BOT_URL;
  const session = await getServerSession(authOptions);
  const username = session?.user?.name;

  async function getUserId() {
    const response = await fetch(`${botUrl}/checkAllowedUser/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) return null;
    const data = await response.json();
    return data;
  }

  const discordUserData = await getUserId();

  if (!discordUserData) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="dashboard__wrapper dashboard__unauthorized container">
            <div>
              <h1 className="dashboard__unauthorized-title">
                Usuário não autorizado
              </h1>
              <p className="dashboard__unauthorized-desc">
                Acesse o servidor e solicite a um moderador para permitir o seu
                usuário
              </p>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="dashboard">
      <UserInfoManager discordUserData={discordUserData} />
      <div className="dashboard__wrapper">
        <DashboardSidebar />
        {children}
      </div>
    </div>
  );
}
