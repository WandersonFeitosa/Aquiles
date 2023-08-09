"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import discordLogo from "../../../public/assets/img/discord-logo.svg";

export default function DiscordLoginButton() {
  const handleLogin = () => {
    signIn("discord");
  };
  return (
    <div>
      <button className="login__button" onClick={handleLogin}>
        <Image
          src={discordLogo}
          loading="lazy"
          alt="discord-logo"
          className="login__discord-logo"
        />
        Entrar com Discord
      </button>
    </div>
  );
}
