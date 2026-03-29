import express from 'express';
import { startGame, makeOffer, getGameSession } from '../controllers/gameSession.controllers.js';
import {authUser} from '../middleware/authMiddleware.js'


const router = express.Router();

/**
 * @route POST /api/game-session/start
 * @desc Start a new game session for a user
 * @access private
 */
router.post('/start', authUser ,  startGame);

/**
 * @route POST /api/game-session/:sessionId/offer
 * @desc Make an offer in an existing game session
 * @access private
 */
router.post('/:sessionId/offer', authUser , makeOffer);

/**
 * @route GET /api/game-session/:sessionId
 * @desc Get game session info and all rounds (for frontend replay or chat display)
 * @access private
 */
router.get('/:sessionId', authUser , getGameSession);



export default router;