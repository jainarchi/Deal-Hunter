import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})



export async function getGame({product}) {
    const response = await api.get("/api/game-session/start" , {product})
    console.log(response.data)

//     {
//     "success": true,
//     "message": "Game started",
//     "sessionId": "69c99163f1889ef42b52d9da",
//     "product": "Office Chair",
//     "AIMessage": "I am offering this Office Chair for ₹14000 !.",
//     "AIResponse": 14000
// }
    return response.data
}


export async function makeOffer({sessionId , userMessage}) {
    const response = await api.post(`/api/game-session/offer/${sessionId}`, {userMessage})
    console.log(response.data)
    return response.data

/*
{
    "success": true,
    "AIMessage": "Deal done",
    "deal": true,
    "currentRound": 2,
    "finalPrice": 10000
}

or 

{
    "success": true,
    "AIMessage": "₹11,000. This chair is a fantastic deal—ergonomic, durable, and includes a 5-year warranty!",
    "AIResponse": 11,
    "deal": false,
    "currentRound": 5,
    "finalPrice": 17000
}


or 

{
    "success": false,
    "error": "Please mention a price in your message"
}
    or
    {
    "error": "Max rounds reached"
  }
*/
    
}


export async function getAllGamePlayed() {
    const response = await api.get("/api/game-session/my-games")
    console.log(response.data)
    return response.data

/*
    {
    "success": true,
    "data": [
        {
            "_id": "69c990e3f1889ef42b52d99e",
            "userId": "69c990d7f1889ef42b52d99a",
            "product": "Office Chair",
            "AIProfileId": "69c95116556e1039ceedaab0",
            "currentRound": 9,
            "lastOffer": 11500,
            "lastUserOffer": 8000,
            "finalPrice": 11500,
            "createdAt": "2026-03-29T20:51:47.427Z",
            "updatedAt": "2026-03-29T20:53:38.713Z",
            "__v": 0
        },
        {
            "_id": "69c99163f1889ef42b52d9da",
            "userId": "69c990d7f1889ef42b52d99a",
            "product": "Office Chair",
            "AIProfileId": "69c95116556e1039ceedaab1",
            "currentRound": 9,
            "lastOffer": 11,
            "lastUserOffer": 11000,
            "finalPrice": 11000,
            "createdAt": "2026-03-29T20:53:55.836Z",
            "updatedAt": "2026-03-29T20:56:32.114Z",
            "__v": 0
        }
    ]
}
*/
    
}



