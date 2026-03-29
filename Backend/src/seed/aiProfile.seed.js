
import "dotenv/config"
import mongoose from "mongoose"
import aiProfileModel from "../models/aiProfile.model.js"


export const aiProfiles = [


  { product: "Sony Headphones", strategyType: "aggressive", minPrice: 15000, targetPrice: 18000 },
  { product: "Sony Headphones", strategyType: "patient", minPrice: 14000, targetPrice: 17000 },
  { product: "Sony Headphones", strategyType: "random", minPrice: 13000, targetPrice: 16000 },

  { product: "Apple Watch", strategyType: "aggressive", minPrice: 40000, targetPrice: 45000 },
  { product: "Apple Watch", strategyType: "patient", minPrice: 38000, targetPrice: 43000 },
  { product: "Apple Watch", strategyType: "random", minPrice: 36000, targetPrice: 42000 },

  { product: "Canon Camera", strategyType: "aggressive", minPrice: 55000, targetPrice: 65000 },
  { product: "Canon Camera", strategyType: "patient", minPrice: 52000, targetPrice: 62000 },
  { product: "Canon Camera", strategyType: "random", minPrice: 50000, targetPrice: 60000 },

  { product: "PlayStation 5", strategyType: "aggressive", minPrice: 48000, targetPrice: 55000 },
  { product: "PlayStation 5", strategyType: "patient", minPrice: 46000, targetPrice: 53000 },
  { product: "PlayStation 5", strategyType: "random", minPrice: 44000, targetPrice: 50000 },

  { product: "Samsung Smart TV", strategyType: "aggressive", minPrice: 52000, targetPrice: 60000 },
  { product: "Samsung Smart TV", strategyType: "patient", minPrice: 50000, targetPrice: 58000 },
  { product: "Samsung Smart TV", strategyType: "random", minPrice: 48000, targetPrice: 55000 },

  { product: "Bicycle", strategyType: "aggressive", minPrice: 14000, targetPrice: 18000 },
  { product: "Bicycle", strategyType: "patient", minPrice: 13000, targetPrice: 17000 },
  { product: "Bicycle", strategyType: "random", minPrice: 12000, targetPrice: 16000 },

  { product: "Nike Sneakers", strategyType: "aggressive", minPrice: 9000, targetPrice: 12000 },
  { product: "Nike Sneakers", strategyType: "patient", minPrice: 8500, targetPrice: 11000 },
  { product: "Nike Sneakers", strategyType: "random", minPrice: 8000, targetPrice: 10000 },

  { product: "Office Chair", strategyType: "aggressive", minPrice: 12000, targetPrice: 15000 },
  { product: "Office Chair", strategyType: "patient", minPrice: 11000, targetPrice: 14000 },
  { product: "Office Chair", strategyType: "random", minPrice: 10000, targetPrice: 13000 },

]




const seedData = async () => {

 if (process.env.NODE_ENV !== "development") {
  console.log("❌ Seeding allowed only in development")
  process.exit()
}

  try {
    await mongoose.connect(process.env.MONGO_URI) /

    console.log("✅ DB Connected")

    await aiProfileModel.deleteMany()
    
    await aiProfileModel.insertMany(aiProfiles)

    console.log(" Data Seeded Successfully")
    process.exit()


  } catch (error) {
    console.error(" Error:", error)
    process.exit(1)
  }
}

seedData()