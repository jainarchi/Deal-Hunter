import leaderboardModel from "../models/leaderboard.model.js";

/**
* @desc store all game sessions but 
*       compute global ranking based on the best score per user to ensure fair competition.
*/

 const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await leaderboardModel.aggregate([
      {
        $group: {
          _id: "$userId",                          // group by userId
          bestScore: { $max: "$score" },
          bestPrice: { $min: "$finalPrice" }           // lowest price = highest score
        }
      },
      {
        $sort: { bestScore: -1 }         // high score first
      },
      {
        $limit: 10
      }
    ]);

    res.json({
      success: true,
      leaderboard
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard"
    })
  }
}




 const getMyGames = async (req, res) => {
  try {
    const games = await gameModel.find({
      userId: req.user.id
    });

    res.json({
      success: true,
      data: games
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch games"
    })
  }
}

export {
    getLeaderboard,
    getMyGames
}