import mongoose from "mongoose";

const roundSchema = new mongoose.Schema({
  gameSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gameSession",
    required: true,
  },

  roundNumber: {
    type: Number,
    required: true,
  },

  userOffer: {
    type: Number,
    default : null
  },
  userMessage: {
    type: String,
     default : null
  },
  
  AIResponse: {
    type: Number,
    required: true,
  },
  AIMessage: {
    type: String,
     default : null
  },
 
}, {
    timestamps: true
});

const roundModel = mongoose.model("round", roundSchema);

export default roundModel;
