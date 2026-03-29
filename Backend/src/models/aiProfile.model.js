import mongoose from 'mongoose';

const aiProfileSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    targetPrice: {
      type: Number,
      required: true,
    },
    strategyType: {
      type: String,
      enum: ["aggressive", "patient", "random"],
      required: true,
    },
  },
  { timestamps: true }
)



aiProfileSchema.index({ product: 1, strategyType: 1 }, { unique: true });

const aiProfileModel = mongoose.model("AIProfile", aiProfileSchema);

export default aiProfileModel;