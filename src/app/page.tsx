import { getServerSession } from "next-auth";
import DiscordLoginButton from "./components/DiscordLoginButton";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="login">
      <h1 className="login__title">Realize o Login para continuar</h1>
      <DiscordLoginButton />
    </div>
  );
}
