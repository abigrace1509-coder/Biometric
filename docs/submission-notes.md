# College Submission Notes

## Abstract
This project proposes a Biometric-Based Secure Online Voting System for university elections using the MERN stack. It combines credential-based authentication (email/password) with biometric verification to ensure one person-one vote. The system enforces role-based authorization, secures vote submission, and provides real-time result visualization for administrators. The architecture is modular, scalable, and deployment-ready.

## Problem Statement
Traditional college elections are vulnerable to impersonation, duplicate voting, manual delays, and lack of transparency. The goal is to build a secure digital system that:
1. Authenticates genuine voters,
2. Prevents multiple votes by the same user,
3. Preserves vote integrity and anonymity,
4. Allows real-time, tamper-resistant election management.

## System Architecture Diagram (Text Explanation)
1. **React Frontend** sends API requests via Axios.
2. **Express Backend** validates JWT tokens and roles through middleware.
3. **MongoDB** stores users, biometric templates, elections, candidates, and votes.
4. **Biometric Engine (hash simulation)** converts image/base64 input to SHA-256 template and compares against stored template.
5. **Vote Service** checks active election + biometric freshness + prior vote before recording.
6. **Results Service** aggregates votes and returns counts for chart rendering.

## Future Enhancements
- Real face recognition using embeddings (FaceNet/DeepFace).
- Fingerprint sensor SDK integration.
- OTP/email confirmation and CAPTCHA.
- PDF report generation and signed audit trails.
- Blockchain-backed immutable vote ledger.
- Multi-election support with configurable windows.

## Conclusion
The system demonstrates a practical, secure, and modern approach for campus e-voting. By combining JWT security, hashed passwords, biometric verification, and strict vote constraints, it provides a reliable foundation for transparent student elections.

## Viva Quick Explanation
- **Why JWT?** Stateless, scalable auth for APIs.
- **Why bcrypt?** Protects stored passwords using salted hashing.
- **How one-person one-vote?** DB unique index `(election, voter)` + pre-check in vote API.
- **How biometric works?** User uploads image, server hashes content, compares with enrolled template.
- **How anonymity is maintained?** Ballot choice is stored without exposing identity in result output.
- **How security is enforced?** `protect` and `authorize` middleware checks every protected route.
