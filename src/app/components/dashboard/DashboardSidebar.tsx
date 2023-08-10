"use client";
import { useRouter } from "next/navigation";
import { AdminMenu } from "./AdminMenu";

export function DashboardSidebar() {
  const router = useRouter();

  function handleMenuClick(event: React.MouseEvent<HTMLLIElement>) {
    const url = "/dashboard" + event.currentTarget.dataset.url;

    router.push(url);
  }

  return (
    <div className="dashboard__sidebar">
      <ul>
        <li data-url="/" onClick={handleMenuClick}>
          Dashboard
        </li>
        <li data-url="/familia" onClick={handleMenuClick}>
          Família
        </li>
        <li data-url="/missoes" onClick={handleMenuClick}>
          Missões
        </li>
        <li data-url="/registrar-missao" onClick={handleMenuClick}>
          Registrar missão
        </li>
      </ul>
      <AdminMenu />
    </div>
  );
}
