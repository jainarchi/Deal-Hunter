import mongooe from "mongoose";

const connectToDB = () =>{
    mongooe.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log(err)
    })
}


export default connectToDB