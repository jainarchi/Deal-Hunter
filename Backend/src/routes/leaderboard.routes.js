import express from "express";
import { authUser } from "../middleware/authMiddleware.js";
import {getLeaderboard } from "../controllers/leaderboard.controllers.js";

const router = express.Router();

/**
 * @route GET /api/leaderboard/
 * @desc Get global leaderboard (top players)
 * @access private
 */
router.get("/", authUser , getLeaderboard);




export default router;