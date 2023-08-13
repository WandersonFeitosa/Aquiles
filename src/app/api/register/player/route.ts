import { NextResponse } from "next/server";
import connectMongo from "../../mongo/connect";
import { Player } from "../../mongo/schemas";

export async function POST(request: Request) {
  try {
    const { username, avatar, isUserAdmin, discordId } = await request.json();

    await connectMongo();

    if (!discordId)
      return NextResponse.json({
        message: "DiscordId não informado",
      });

    const userExist = await Player.find({ discordId: discordId });

    if (userExist && userExist.length > 0)
      return NextResponse.json({
        message: "Usuário já registrado",
        registered: true,
        user: userExist,
      });

    const newPlayer = new Player({
      discordId,
      username,
      avatar,
      isUserAdmin,
    });

    await newPlayer.save();

    return NextResponse.json({
      message: "Usuário registrado",
      registered: false,
      user: newPlayer,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err, success: false });
  }
}
