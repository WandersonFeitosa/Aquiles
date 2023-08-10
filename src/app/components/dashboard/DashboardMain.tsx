import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function DashboardMain() {
  const session = await getServerSession(authOptions);
  return (
    <div className="dashboard__main">
      <h1 className="dashboard__title">Dashboard</h1>
      <p className="dashboard__description">
        Bem vindo(a), {session?.user?.name}!
      </p>
    </div>
  );
}
