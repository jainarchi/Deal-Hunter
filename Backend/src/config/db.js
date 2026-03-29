import "dotenv/config"
import mongoose from 'mongoose'




const connectToDB = () =>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log(err)
    })
}


export default connectToDB