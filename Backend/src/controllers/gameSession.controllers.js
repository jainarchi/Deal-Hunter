import gameModel from '../models/gameSession.model.js'
import aiProfileModel from '../models/aiProfile.model.js'
import roundModel from '../models/round.model.js';
import leaderboardModel from '../models/leaderboard.model.js';
import {getAIResponse} from '../utils/aiLogic.js'

// Start a new game session
export const startGame = async (req, res) => {
  try {
    const { product } = req.body;

    const aiProfiles = await aiProfileModel.find({ product });

    if (!aiProfiles.length) {
      return res.status(400).
      json({ 
        error: "No AI profiles for this product" 
      })
    }

    const aiProfile = aiProfiles[Math.floor(Math.random() * aiProfiles.length)]

    const gameSession = await gameModel.create({
      userId: req.user.id,
      product,
      AIProfileId: aiProfile._id,
      currentRound: 1,
      lastOffer: null
    })


    res.status(201).json({
      message: "Game started",
      sessionId: gameSession._id,
      product,
      strategy: aiProfile.strategyType
    });

  } catch (err) {
    res.status(500).json({ 
      success : false,
      message: "Start game failed",
      err: "Start game failed" 
    })
  }
}



export const makeOffer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { userOffer, userMessage } = req.body;

    const session = await gameModel.findById(sessionId)
    if (!session) return res.status(404)
      .json({ error: "Session not found" 
    })

    if (session.currentRound > 8) {
      return res.status(400).json({ error: "Max rounds reached" });
    }

    const aiProfile = await aiProfileModel.findById(session.AIProfileId);

   
    const AIResponse = getAIResponse(userOffer, aiProfile, session.currentRound);

    const isDeal = userOffer >= AIResponse;



    await roundModel.create({
      gameSessionId: session._id,
      roundNumber: session.currentRound,
      userOffer,
      userMessage,
      AIResponse,
      AIMessage: isDeal ? "Deal accepted 🤝" : `Best I can do is ₹${AIResponse}`
    });

    session.lastOffer = AIResponse;
    session.currentRound += 1;


    if (isDeal || session.currentRound > 8) {
      session.finalPrice = isDeal ? userOffer : AIResponse;

      const score = Math.max(0, 100000 - session.finalPrice);

      await leaderboardModel.create({
        userId: session.userId,
        finalPrice: session.finalPrice,
        score
      })
    }

    await session.save();

    res.json({
      success: true,
      AIResponse,
      deal: isDeal,
      currentRound: session.currentRound,
      finalPrice: session.finalPrice || null
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Offer failed" });
  }
}




// show all rounds in a session

export const getGameSession = async (req, res) => {
  try {
    const session = await gameModel.findById(req.params.sessionId);

    const rounds = await roundModel.find({
      gameSessionId: session._id
    });

    res.json({ session, rounds });

  } catch (err) {
    res.status(500).json({ 
      success : false,
      message: "Fetch failed",  
      err: "Fetch failed" 
    });
  }
};