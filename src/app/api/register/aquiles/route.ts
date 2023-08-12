import { NextResponse } from "next/server";
import connectMongo from "../../mongo/connect";
import { Aquiles } from "../../mongo/schemas";

export async function POST(request: Request) {
  try {
    const { username, avatar, familyId, isUserAdmin, discordId } =
      await request.json();

    await connectMongo();

    const userExist = await Aquiles.find({ discordId: discordId });

    if (userExist && userExist.length > 0)
      return NextResponse.json({
        message: "Usuário registrado",
        registered: true,
        user: userExist,
      });

    const newAquiles = new Aquiles({
      username,
      avatar,
      familyId,
      isUserAdmin,
      discordId,
    });

    await newAquiles.save();

    return NextResponse.json({
      message: "Usuário registrado",
      registered: true,
      user: newAquiles,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err, success: false });
  }
}
