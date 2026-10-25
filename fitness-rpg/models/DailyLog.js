import mongoose from "mongoose";

const DailyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  mission: {
    type: String,
    required: true,
  },

  gameDay: {
    type: String,
    required: true,
  },

  completedAt: {
    type: Date,
    default: Date.now,
  },

  xpEarned: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.DailyLog ||
  mongoose.model("DailyLog", DailyLogSchema);