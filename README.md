# Spectra : Early Autism Awareness & Screening Platform

> "The first step to helping your child isn't a diagnosis. It's knowing what you're looking at."

[![Live Demo](https://img.shields.io/badge/Live%20Demo-spectra--jet.vercel.app-7c3aed?style=for-the-badge)](https://spectra-jet.vercel.app)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Python](https://img.shields.io/badge/Python-Flask-3776ab?style=for-the-badge&logo=python)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?style=for-the-badge&logo=mongodb)

---

## What is Spectra?

Spectra is a full-stack early autism awareness and screening platform built for parents of children under 5 years old. In India, the average age of autism diagnosis is 5–8 years ;long after the most critical intervention window has passed. Parents often sense something is different in their child as early as 12–18 months, but face dismissal from doctors and have no structured guidance on what to do next.

Spectra addresses this gap by combining psychoeducational content, ML-based behavioral screening, a searchable behavior reference library, and a personalized action roadmap ; including guidance on how to advocate for their child when medical professionals dismiss early concerns.

**Spectra does not replace clinical diagnosis. It replaces the silence that exists before one.**

---

## Live Demo

**→ [spectra-jet.vercel.app](https://spectra-jet.vercel.app)**

| Service | URL |
|---|---|
| Frontend (Vercel) | https://spectra-jet.vercel.app |
| API (Render) | https://spectra-api-ntsh.onrender.com/api/health |
| ML service (Render) | https://spectra-ml.onrender.com/health |

> **First load may take ~45 seconds.** Both backend services run on Render's free tier, which spins them down after 15 minutes of inactivity. The screening request has a 60s timeout to tolerate this cold start — subsequent requests are fast.

Deployment is scripted via [`render.yaml`](render.yaml); see [DEPLOYMENT.md](DEPLOYMENT.md) for the full Vercel + Render setup.

---

## Architecture

```
┌──────────────────┐        ┌───────────────────┐        ┌───────────────────────┐
│  React SPA       │  HTTPS │  Node / Express   │  HTTP  │  Flask ML service     │
│  (Vercel)        │───────▶│  REST API (Render)│───────▶│  XGBoost + SHAP       │
│  auth, screening │  /api  │  JWT auth, CORS,  │/predict│  (Render, gunicorn)   │
│  results, roadmap│        │  rate limiting    │        │                       │
└──────────────────┘        └─────────┬─────────┘        └───────────────────────┘
                                      │ Mongoose
                                      ▼
                            ┌───────────────────┐
                            │  MongoDB Atlas    │
                            │  users, children, │
                            │  screenings,      │
                            │  behaviors,       │
                            │  journal entries  │
                            └───────────────────┘
```

The client never talks to the ML service directly — every screening goes through the authenticated Node API, which validates input, calls Flask for the prediction + SHAP explanation, and persists the result.

---

## Features

### Public (no login required)
- **Awareness Hub** : What autism is, early signs by age band (12m–48m+), myths vs facts in Indian context, understanding the spectrum  
- **Landing page** : Problem statement, platform overview, statistics  

### Authenticated (login required)
- **Behavioral Screening** : Age-gated 10-question form based on M-CHAT-R criteria  
- **ML Risk Assessment** : XGBoost model returns Low / Medium / High risk band with confidence score  
- **SHAP Explainability** : Top 3 plain-language reasons for each result  
- **Behavior Library** : Searchable database of 28 autism-related behaviors across social, communication, sensory, motor, and play domains, with age-band and concern-level filters  
- **Action Roadmap** : Personalized 3-tier next steps: Observe → Consult → Seek specialist  
- **Doctor Script** : Exact phrases to use with pediatricians, including what to say if dismissed  
- **Progress Journal** : Weekly behavioral logs with Recharts trend visualization  

---

## Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React.js, React Router DOM, Axios, Recharts |
| Backend | Node.js, Express.js, Helmet, express-rate-limit |
| ML Microservice | Python, Flask (gunicorn in production), XGBoost, SHAP, scikit-learn |
| Database | MongoDB Atlas |
| Authentication | JWT (JSON Web Tokens), bcrypt password hashing |
| Deployment | Vercel (frontend), Render Blueprint (backend + ML) |
| Version Control | Git + GitHub |

---

## ML Model

| Metric | Value |
|-------|------|
| Dataset | UCI Autism Screening Toddler Dataset |
| Training records | 1,054 |
| Features | A1–A10 (M-CHAT-R behavioral items), Age_Mons, Sex, Jaundice, Family_mem_with_ASD |
| Algorithm | XGBoost Classifier, tuned via `GridSearchCV` + stratified 5-fold CV |
| Baseline | Logistic Regression (for comparison) |
| Test ROC-AUC / PR-AUC | 1.0 / 1.0 (both baseline and tuned XGBoost — see note below) |
| Explainability | SHAP (SHapley Additive exPlanations) |
| Tests | `pytest` suite covering the `/predict` and `/health` endpoints (`ml/test_app.py`) |

The model is trained on behavioral responses (A1–A10) plus `Age_Mons`, `Sex`, `Jaundice`, and `Family_mem_with_ASD`. `Ethnicity` was deliberately excluded — see **Model Limitations & Ethics** below. SHAP values generate plain-language explanations of each prediction, mapped to the top 3 contributing features per result.

### Model Limitations & Ethics

- **Why accuracy is near-perfect, and why that's not the headline metric:** the dataset's label is derived from thresholding the Q-CHAT-10 score, which is essentially the sum of the same A1–A10 answers used as model inputs. Even a plain logistic regression baseline reaches a perfect 1.0 ROC-AUC/PR-AUC on held-out data — confirming the classes are near-linearly separable from the behavioral answers alone. This should be read as *"automates M-CHAT-R-style triage with an explanation,"* not as evidence of a model that discovered a novel clinical signal. Full reasoning and the baseline-vs-XGBoost comparison are in [`ml/modeling.ipynb`](ml/modeling.ipynb).
- **Ethnicity was removed as a model feature.** The original dataset's `Ethnicity` column has no established, well-documented clinical link to ASD likelihood, and label-encoding a nominal category like ethnicity implies a false ordinal relationship the model could exploit spuriously. Using race/ethnicity as a raw predictor in a child health-risk score requires a level of justification and fairness auditing this project doesn't have, so it was dropped rather than left in unexamined.
- **False-negative rate is monitored per subgroup (currently by Sex)** since missing an at-risk child is the costlier error in a screening context. Subgroup sample sizes in this 1,054-row dataset are small, so this is a monitoring direction for real usage data, not a completed fairness audit.
- **This is a screening aid, not a diagnostic tool.** Every result includes a disclaimer, and the roadmap explicitly routes users toward a qualified developmental pediatrician rather than presenting the risk band as a conclusion.

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|-------|---------|------|------------|
| POST | `/api/auth/register` | No | Register new parent |
| POST | `/api/auth/login` | No | Login |
| POST | `/api/children` | Yes | Add child profile |
| GET | `/api/children` | Yes | Get children |
| POST | `/api/screening/submit` | Yes | Submit screening → calls Flask |
| GET | `/api/screening/history/:childId` | Yes | Get screening history |
| GET | `/api/behaviors` | Yes | Search behavior library |
| POST | `/api/journal` | Yes | Add weekly journal entry |
| GET | `/api/journal/history/:childId` | Yes | Get journal history |
| GET | `/api/health` | No | Health check (used by Render) |

Auth endpoints are rate-limited (20 requests / 15 min per IP) to slow brute-force attempts.

---

## Engineering Decisions

- **ML as a separate microservice** — the Python model is isolated behind its own HTTP API instead of being shelled out from Node, so each service scales and deploys independently and the model can be retrained/swapped without touching the API.
- **All config via environment variables** — no URLs or secrets in code; the server validates required env vars at startup and fails fast with a clear error instead of crashing on first request.
- **CORS allowlist, not `*`** — the API only accepts browser requests from the deployed frontend origin and localhost.
- **Rate limiting on auth routes** — login/register are the brute-force surface, so they get a strict per-IP limit; the rest of the API stays unthrottled behind JWT auth.
- **Model artifacts are committed** — the trained `.pkl` files (~small) are versioned in git so a deploy is reproducible without re-running training; the notebook that produced them is committed alongside.
- **Deliberately not included** (scope control for a solo project): Docker, CI/CD, refresh-token rotation, caching layers. Each is a known next step, not an oversight.

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- Python 3.9+
- MongoDB Atlas account (free tier)

### 1. Clone the repo
```bash
git clone https://github.com/Ana-m7/Spectra.git
cd Spectra
```

### 2. ML microservice setup
```bash
cd ml
pip install -r requirements.txt
python app.py          # runs on http://localhost:5001
```

### 3. Backend setup
```bash
cd server
cp .env.example .env   # then fill in MONGO_URI and JWT_SECRET
npm install
node config/seedBehaviors.js   # one-time: seed the Behavior Library
npm run dev            # runs on http://localhost:5000
```

### 4. Frontend setup
```bash
cd client
npm install
npm start              # runs on http://localhost:3000
```

Visit `http://localhost:3000`. No client `.env` needed locally — it defaults to the local API.

To deploy, follow [DEPLOYMENT.md](DEPLOYMENT.md).

---

## Screenshots

> Try it live at **[spectra-jet.vercel.app](https://spectra-jet.vercel.app)** — screenshots and a walkthrough video are being added.

---

## Problem Statement

Autism Spectrum Disorder (ASD) is a neurodevelopmental condition where early intervention — ideally before age 5 — significantly improves long-term outcomes. Yet in India, the average age of diagnosis remains between 5–8 years.

Three problems drive this gap:

**1. Lack of awareness** : Most Indian parents have no understanding of what autism is, what the spectrum means, or what early behavioral signs look like.

**2. Dismissal at first contact** : Parents who raise concerns with general pediatricians are frequently told to wait and see, without any referral or follow-up.

**3. No structured roadmap** : Even persistent parents have nowhere to turn. Information is scattered and not designed for a first-time Indian parent.

Spectra addresses all three.

---

## Future Scope

- Hindi and Marathi language support  
- Mobile app (React Native)  
- Integration with RBSK (Rashtriya Bal Swasthya Karyakram) screening programs  
- Community forum for parents  
- Therapist-facing portal for progress tracking  
- Multilingual awareness content  

---

## Developer

**Anam Khan**  
B.Tech Computer Engineering ; KJ Somaiya College of Engineering, Mumbai (2023–2027)

- LinkedIn: https://linkedin.com/in/anam-k-02878830b  
- GitHub: https://github.com/Ana-m7  

---

*Spectra is not a clinical diagnostic tool. Always consult a qualified developmental pediatrician.*
