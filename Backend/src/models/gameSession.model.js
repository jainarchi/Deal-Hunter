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
    lastOffer: { type: Number },
    finalPrice: { type: Number }, // set when game ends
  },
  { timestamps: true },
);


const gameSessionModel = mongoose.model("gameSession", gameSessionSchema);

export default gameSessionModel;