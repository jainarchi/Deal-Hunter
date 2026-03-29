import mongoose from 'mongoose';



const aiProfileSchema = new mongoose.Schema({
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
});


const aiProfileModel = mongoose.model("aiProfile", aiProfileSchema);

export default aiProfileModel;
