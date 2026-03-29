       +----------------+
       |     User       |
       |----------------|
       | _id            |◄──────────────┐
       | username       |               │
       | email          |               │
       | password       |               │
       +----------------+               │
                │                        │
                │ (JWT login/auth)       │
                ▼                        │
       +----------------+               │
       |  GameSession   |               │
       |----------------|               │
       | _id            |               │
       | userId --------┘ (ref User)    │
       | product        |               │
       | AIProfileId    |──────────────►│
       | currentRound   |               │
       | lastOffer      |               │
       | finalPrice     |               │
       +----------------+               │
                │                        │
                │ (Rounds stored separately)
                ▼
       +----------------+
       |     Round      |
       |----------------|
       | _id            |
       | gameSessionId --┐ (ref GameSession)
       | roundNumber     |
       | userOffer       |
       | userMessage     |
       | AIResponse      |
       | AIMessage       |
       | timestamp       |
       +----------------+
                │
                │ (after game ends)
                ▼
       +----------------+
       |   Leaderboard  |
       |----------------|
       | _id            |
       | userId --------┘ (ref User)
       | finalPrice     |
       | score          |
       | date           |
       +----------------+
                │
                │ (aggregate per user not make a separate schema )
                ▼
       +----------------+
       | Global Ranking |
       |----------------|
       | userId --------┘
       | totalScore     |
       | rank           |
       +----------------+
                │
                ▼
       +----------------+
       |   AIProfile    |
       |----------------|
       | _id            |
       | minPrice       |
       | targetPrice    |
       | strategyType   |
       +----------------+


## Flow Explanation

- User logs in → JWT token issued.
- User starts game → GameSession created with AIProfile reference.
- Negotiation rounds → stored in Round collection (user offer + AI response).
- currentRound increments each exchange; max rounds = 8.
- Game ends → finalPrice calculated → new Leaderboard entry.
- Global ranking → aggregate all Leaderboard scores per user.
- AIProfile defines AI behavior per session and persists throughout GameSession.

### Key points

- GameSession (one complete game ) = one full negotiation game
- Round collection = stores each round separately (scalable, safe)
- Leaderboard = stores final scores per game 
- Global Ranking = aggregate Leaderboard per user
- AIProfile = defines AI strategy per session
