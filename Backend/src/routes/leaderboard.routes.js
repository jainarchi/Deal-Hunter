import express from "express";
import { authUser } from "../middleware/authMiddleware.js";
import {getLeaderboard , getMyGames} from "../controllers/leaderboard.controllers.js";

const router = express.Router();

/**
 * @route GET /api/leaderboard/
 * @desc Get global leaderboard (top players)
 * @access private
 */
router.get("/", authUser , getLeaderboard);


/**
 * @route GET /api/leaderboard/my-games
 * @desc Get all games played by user
 * @access private
 */
router.get('/my-games', authUser, getMyGames);




export default router;