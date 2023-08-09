import {
  authOptions,
  loginRequiredServer,
} from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  await loginRequiredServer();

  const session = await getServerSession(authOptions);
  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <p className="dashboard__description">
        Bem vindo(a), {session?.user?.name}!
      </p>
    </div>
  );
}
