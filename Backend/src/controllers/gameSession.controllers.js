import gameModel from '../models/gameSession.model.js'
import aiProfileModel from '../models/aiProfile.model.js'
import roundModel from '../models/round.model.js';
import leaderboardModel from '../models/leaderboard.model.js';
import { getAIReply } from '../services/ai.service.js';


export const startGame = async (req, res) => {
  try {
    const { product } = req.body;

    const aiProfiles = await aiProfileModel.find({ product });

    if (!aiProfiles.length) {
      return res.status(400).json({
        error: "No AI profiles for this product",
      });
    }

    const aiProfile =
      aiProfiles[Math.floor(Math.random() * aiProfiles.length)];

    const gameSession = await gameModel.create({
      userId: req.user.id,
      product,
      AIProfileId: aiProfile._id,
      currentRound: 1,
      lastOffer: aiProfile.targetPrice,
    });

    const aiMessage = `I am offering this ${product} for ₹${aiProfile.targetPrice} !.`;

    await roundModel.create({
      gameSessionId: gameSession._id,
      roundNumber: 1,
      userOffer: null,              
      userMessage: null,
      AIResponse: aiProfile.targetPrice,
      AIMessage: aiMessage,
    });

    res.status(201).json({
      success: true,
      message: "Game started",
      sessionId: gameSession._id,
      product,
      AIMessage: aiMessage,   
      AIResponse: aiProfile.targetPrice
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Start game failed",
    })
  }
}




export const makeOffer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { userMessage } = req.body;

    const session = await gameModel.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (session.currentRound > 8) {
      return res.status(400).json({ error: "Max rounds reached" });
    }

    const extractOffer = (msg) => {
      const match = msg.match(/\d+/);
      return match ? Number(match[0]) : null;
    };

    let userOffer = extractOffer(userMessage);

    if (!userOffer) {
      if (session.lastUserOffer) {
        userOffer = session.lastUserOffer;
      } else {
        return res.status(400).json({
          error: "Please mention a price in your message",
        })
      }
    }

     const aiProfile = await aiProfileModel.findById(session.AIProfileId);

 
    const rounds = await roundModel
      .find({ gameSessionId: sessionId })
      .sort({ createdAt: -1 })
      .limit(3);

    const history = rounds
      .reverse()
      .map((r) => `User: ${r.userMessage}\nAI: ${r.AIMessage}`)
      .join("\n");

      console.log(history)


    const aiText = await getAIReply({
      product: session.product,
      strategy: aiProfile.strategyType,
      minPrice: aiProfile.minPrice,
      targetPrice: aiProfile.targetPrice,
      history,
      userMessage,
    });

    
    const extractAIPrice = (msg) => {
      const match = msg.match(/\d+/);
      return match ? Number(match[0]) : aiProfile.targetPrice;
    };

    const AIResponse = extractAIPrice(aiText);

    let isDeal = false;

    if (userOffer >= aiProfile.minPrice) {
       isDeal = true;
    }

    console.log(isDeal)
  

  
    await roundModel.create({
      gameSessionId: session._id,
      roundNumber: session.currentRound,
      userOffer,
      userMessage,
      AIResponse,
      AIMessage: aiText,
    });

 
    session.lastOffer = AIResponse;        
    session.lastUserOffer = userOffer;    
    session.currentRound += 1;

   
    if (isDeal || session.currentRound > 8) {
      session.finalPrice = isDeal ? userOffer : AIResponse;
      console.log(session.finalPrice)

      const score = Math.max(0, 10000 - session.finalPrice);

      await leaderboardModel.create({
        userId: session.userId,
        finalPrice: session.finalPrice,
        score,
      });

    
    }

    await session.save();



   if(isDeal){
       res.json({
         success: true,
         AIMessage: "Deal done",
         deal: isDeal,
         currentRound: session.currentRound,
         finalPrice: session.finalPrice,
       })
   }



    res.json({
      success: true,
      AIMessage: aiText,
      AIResponse,
      deal: isDeal,
      currentRound: session.currentRound,
      finalPrice: session.finalPrice || null,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Offer failed" });
  }
};


// show all games played

 export const getMyGames = async (req, res) => {
  try {
    const games = await gameModel.find({
      userId: req.user.id
    });

    res.json({
      success: true,
      data: games
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Failed to fetch games"
    })
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


