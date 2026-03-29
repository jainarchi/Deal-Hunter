export const getAIResponse = (userOffer, aiProfile, currentRound) => {
  const { minPrice, targetPrice, strategyType } = aiProfile;

  let response;

  switch (strategyType) {

    case "aggressive":
      if (userOffer >= targetPrice) return userOffer;
      response = targetPrice - (currentRound * 1000);
      break;

    case "patient":
      if (userOffer >= targetPrice) return userOffer;
      response = targetPrice - (currentRound * 2000);
      break;

    case "random":
      const randomDrop = Math.floor(Math.random() * 3000);
      response = targetPrice - randomDrop;
      break;

    default:
      response = targetPrice;
  }

  if (response < minPrice) response = minPrice;

  if (userOffer >= response) return userOffer;

  return response;
};