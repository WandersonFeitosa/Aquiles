import { NextResponse } from "next/server";
import { WeeklyMissions } from "../../mongo/schemas";
export async function POST(request: Request) {
  try {
    const { title, description, startDate, endDate, reward } =
      await request.json();

    const newWeeklyMission = new WeeklyMissions({
      title,
      description,
      startDate,
      endDate,
      reward,
    });

    await newWeeklyMission.save();

    return NextResponse.json({ newWeeklyMission, success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err, success: false });
  }
}
