import { getServerSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { redirect, useRouter } from "next/navigation";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
};

export async function loginRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
}

export async function loginRequiredClient() {
  if (typeof window === "undefined") {
    const session = await getServerSession(authOptions);
    const router = useRouter();
    if (!session) router.push("/login");
  }
}
