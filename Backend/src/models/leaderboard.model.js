import mongoose from "mongoose";


const leaderboardSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true
   },  // simple string ID for now

  finalPrice: { type: Number, required: true },
  score: { type: Number, required: true },  // lower price = higher score
  date: { type: Date, default: Date.now }
});



const leaderboardModel = mongoose.model('leaderboard', leaderboardSchema);

export default leaderboardModel