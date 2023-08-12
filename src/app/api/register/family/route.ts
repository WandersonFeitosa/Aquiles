import { NextResponse } from "next/server";
import connectMongo from "../../mongo/connect";
import { Aquiles, Family, Player } from "../../mongo/schemas";

export async function POST(request: Request) {
  try {
    await connectMongo();
    const { name, creator, members, aquileses } = await request.json();

    const memberData = await Player.find({ discordId: { $in: members } });

    const aquilesesData = await Aquiles.find({ discordId: { $in: aquileses } });

    const newFamily = new Family({
      name,
      creator,
      members: memberData,
      aquiles: aquilesesData,
    });

    await Player.updateMany(
      { discordId: { $in: members } },
      { $push: { familyInvites: newFamily._id } }
    );

    await Aquiles.updateMany(
      { discordId: { $in: aquileses } },
      { $push: { familyInvites: newFamily._id } }
    );

    await newFamily.save();

    return NextResponse.json({ newFamily, success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err, success: false });
  }
}
