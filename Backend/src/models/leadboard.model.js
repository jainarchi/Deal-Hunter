const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true
   },  // simple string ID for now

  finalPrice: { type: Number, required: true },
  score: { type: Number, required: true },  // lower price = higher score
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);