import { useEffect, useState } from "react";

export function AdminMenu() {
  //buscar no session storage a variável isUserAdmin
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    const isUserAdmin = sessionStorage.getItem("isUserAdmin");
    if (isUserAdmin === "true") {
      setIsUserAdmin(true);
    }
  });

  if (!isUserAdmin) return <></>;

  return (
    <div>
      <ul>
        <li>Criar Missão</li>
        <li>Validar Missões</li>
        <li>Famílias adm</li>
      </ul>
    </div>
  );
}
