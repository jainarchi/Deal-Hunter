import mongoose from 'mongoose'

const gameSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    product: {
      type: String,
      required: true,
    },

    AIProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "aiProfile",
      required: true,
    },

    currentRound: {
      type: Number,
      default: 1,
    },

    lastOffer: { 
      type: Number  
    },

    lastUserOffer: { 
      type: Number, 
      default : null
    },

    finalPrice: { 
      type: Number ,
      default : null
    },
  },
  { timestamps: true }
);

const gameSessionModel = mongoose.model("gameSession", gameSessionSchema);

export default gameSessionModel;