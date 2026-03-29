import express from "express"
import authRouter from './routes/auth.routes.js'
import gameSessionRouter from './routes/gameSession.routes.js'
import leaderboardRouter from './routes/leaderboard.routes.js'

const app = express()
app.use(express.json())


app.use('/api/auth' , authRouter)
app.use('/api/game-session' , gameSessionRouter)
app.use('/api/leaderboard' , leaderboardRouter)




export default app 