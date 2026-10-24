import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,

  level: {
    type: Number,
    default: 1,
  },

  xp: {
    type: Number,
    default: 0,
  },

  stats: {
    strength: { type: Number, default: 1 },
    nutrition: { type: Number, default: 1 },
    endurance: { type: Number, default: 1 },
    vitality: { type: Number, default: 1 },
    discipline: { type: Number, default: 1 },
  },

  streaks: {
    workout: { type: Number, default: 0 },
    nutrition: { type: Number, default: 0 },
    hydration: { type: Number, default: 0 },
  },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);