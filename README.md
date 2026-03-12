# Biometric-Based Secure Online Voting System (MERN)

A final-year engineering project implementing **secure online voting** with **JWT authentication**, **bcrypt password hashing**, **role-based access control**, and **biometric verification simulation** (face image hash matching).

## 1) Project Folder Structure

```text
Biometric/
├── server/
│   ├── src/
│   │   ├── config/            # DB connection
│   │   ├── controllers/       # Business logic
│   │   ├── middleware/        # Auth, RBAC, error handling
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API endpoints
│   │   ├── scripts/           # Seed data
│   │   ├── utils/             # JWT + biometric helpers
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── docs/
│   ├── submission-notes.md
│   └── screenshots.md
└── README.md
```

## 2) Features Implemented

- **Admin**: login, create election, activate/close election, view live results.
- **Voter**: register with biometric template, login, biometric verification, cast vote once.
- **Security**: JWT, bcrypt, RBAC, helmet, duplicate vote prevention with API + DB unique index.
- **Voting rules**: one active election at a time, one vote per voter per election.
- **Results**: live counts + winner + bar chart (React Chart.js).
- **Audit log**: election actions are stored in `AuditLog`.

## 3) Backend Setup

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### Seed sample data
```bash
npm run seed
```

Sample users after seed:
- Admin: `admin@college.edu` / `Admin@123`
- Voter: `alice@college.edu` / `Voter@123`
- Demo biometric input string for voter seed: `sample-face-input`

## 4) Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and talks to backend `http://localhost:5000/api`.

## 5) API Modules

- Auth API: `/api/auth`
- Voter/Biometric API: `/api/biometric`
- Candidate API: `/api/candidates`
- Election API: `/api/elections`
- Vote API: `/api/votes`
- Result API: `/api/results`

## 6) Deployment Notes

- Compatible with localhost and cloud (Render/Railway/Vercel + MongoDB Atlas).
- Configure environment variables in deployment platform.
- Set strict `CLIENT_URL`, secure JWT secret, HTTPS-only production setup.

## 7) Screenshots

See `docs/screenshots.md`.

## 8) Viva & Submission Notes

See `docs/submission-notes.md`.
