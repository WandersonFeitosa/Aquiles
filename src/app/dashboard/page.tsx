import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const userImage = session?.user?.image || "";
  return (
    <div className="dashboard__main">
      <div className="dashboard__main__info">
        <div className="dashboard__main__info__wrapper">
          <p className="dashboard__main__info__username">
            {session?.user?.name}
          </p>
          <p className="dashboard__main__info-item">Player</p>
          <p className="dashboard__main__info-item">Família Frô</p>
        </div>
        <div className="dashboard__main__info__avatar">
          <img src={userImage} alt="" />
        </div>
      </div>
    </div>
  );
}
