import express from "express"
import cookieParser from 'cookie-parser'
import morgan from 'morgan'


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(morgan('dev'))



import authRouter from './routes/auth.routes.js'
import gameSessionRouter from './routes/gameSession.routes.js'
import leaderboardRouter from './routes/leaderboard.routes.js'



app.use('/api/auth' , authRouter)
app.use('/api/game-session' , gameSessionRouter)
app.use('/api/leaderboard' , leaderboardRouter)




export default app 