import { NextResponse } from "next/server";
import { Player } from "../../mongo/schemas";

export async function POST(request: Request) {
  try {
    const { discordId } = await request.json();

    const userInfo = await Player.findOne({ discordId });

    if (!userInfo)
      return NextResponse.json({
        err: "Usuário não encontrado",
        success: false,
      });

    return NextResponse.json({ userInfo, success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err, success: false });
  }
}
