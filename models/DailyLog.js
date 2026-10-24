import mongoose from "mongoose";

const DailyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  date: {
    type: String,
    required: true,
  },

  protein: Number,
  calories: Number,
  water: Number,
  steps: Number,

  workoutCompleted: Boolean,

  xpEarned: Number,
});

export default mongoose.models.DailyLog ||
  mongoose.model("DailyLog", DailyLogSchema);