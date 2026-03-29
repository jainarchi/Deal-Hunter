import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})


export async function getLeaderboard() {
    const response = await api.get('/api/leaderboard')
    console.log(response.data)
    return response.data
}