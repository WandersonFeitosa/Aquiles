import mongoose, { model, models } from "mongoose";

const PlayerSchema = new mongoose.Schema({
  discordId: String,
  username: String,
  avatar: String,
  familyId: String,
  isUserAdmin: Boolean,
  familyInvites: [String],
});
const AquilesSchema = new mongoose.Schema({
  username: String,
  avatar: String,
  family: String,
  isUserAdmin: Boolean,
  discordId: String,
  familyInvites: [String],
  completedMissions: [
    {
      id: String,
      images: [String],
      pending: Boolean,
      aproved: Boolean,
      completedDate: Date,
    },
  ],
});
const WeeklyMissionsSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  reward: String,
});
const familySchema = new mongoose.Schema({
  name: String,
  creator: String,
  members: [PlayerSchema],
  aquiles: [AquilesSchema],
});

const Player = models.Player || model("Player", PlayerSchema);
const Aquiles = models.Aquiles || model("Aquiles", AquilesSchema);
const WeeklyMissions =
  models.WeeklyMissions || model("WeeklyMissions", WeeklyMissionsSchema);
const Family = models.Family || model("Family", familySchema);

export { Family, Player, Aquiles, WeeklyMissions };
