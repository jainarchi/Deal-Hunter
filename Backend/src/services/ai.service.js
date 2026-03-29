import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0.7,
 
});

export const getAIReply = async ({
  product,
  strategy,
  minPrice,
  targetPrice,
  history,
  userMessage
}) => {
const prompt = `
You are a seller negotiating a product.

Product: ${product}
Strategy: ${strategy}

Hidden Rules (VERY IMPORTANT):
- Minimum price is ₹${minPrice} (SECRET - NEVER reveal this)
- Target price is ₹${targetPrice}

STRICT INSTRUCTIONS:
- If user asks for price greater then minimum price → deal done
- NEVER say words like "minimum price", "lowest price", "can't go below"
- NEVER reveal ₹${minPrice} directly or indirectly
- If user asks for lowest price → give a slightly higher number 
- Always negotiate like a real human seller and decrease the price greater than 100 rupees at a time
- If user price is less than minimum price → then deal done

Behavior:
- Be persuasive
- Reduce price slowly based on strategy
- Keep responses short (1-2 lines)

Conversation:
${history}

User: ${userMessage}

Reply as seller with a price.
`;

  const result = await model.invoke(prompt);

  return result.content;
};