# Spectra — Early Autism Awareness & Screening Platform

> "The first step to helping your child isn't a diagnosis. It's knowing what you're looking at."

![Spectra](https://img.shields.io/badge/Status-In%20Development-7c3aed?style=for-the-badge)
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

## Live Demo (coming soon)

- Frontend: 
- Backend API:  

---

## Features

### Public (no login required)
- **Awareness Hub** : What autism is, early signs by age band (12m–48m+), myths vs facts in Indian context, understanding the spectrum  
- **Landing page** : Problem statement, platform overview, statistics  

### Authenticated (login required)
- **Behavioral Screening** : Age-gated 10-question form based on M-CHAT-R criteria  
- **ML Risk Assessment** : XGBoost model returns Low / Medium / High risk band with confidence score  
- **SHAP Explainability** : Top 3 plain-language reasons for each result  
- **Behavior Library** : Searchable database of autism-related behaviors with age filters and concern levels  
- **Action Roadmap** : Personalized 3-tier next steps: Observe → Consult → Seek specialist  
- **Doctor Script** : Exact phrases to use with pediatricians, including what to say if dismissed  
- **Progress Journal** : Weekly behavioral logs with Recharts trend visualization  

---

## Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React.js, React Router DOM, Axios |
| Backend | Node.js, Express.js |
| ML Microservice | Python, Flask, XGBoost, SHAP, scikit-learn |
| Database | MongoDB Atlas (app data), MySQL (screening logs) |
| Authentication | JWT (JSON Web Tokens) |
| Media Storage | Cloudinary |
| Deployment | Vercel (frontend), Render (backend + ML) |
| Version Control | Git + GitHub |

---

## ML Model

| Metric | Value |
|-------|------|
| Dataset | UCI Autism Screening Toddler Dataset |
| Training records | 1,054 |
| Algorithm | XGBoost Classifier |
| Accuracy | 98% |
| AUC Score | 0.9994 |
| Explainability | SHAP (SHapley Additive exPlanations) |

The model was trained on behavioral responses (A1–A10 based on M-CHAT-R criteria) plus demographic features. SHAP values are used to generate plain-language explanations of each prediction, mapped to the top 3 contributing features per result.

**Top predictive features identified by SHAP:**
- A7 : Unusual response to sounds (highest impact)
- A9 : Limited facial expressions
- A6 : Does not notice when others are hurt


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

### 2. Backend setup
```bash
cd server
npm install
npm run dev
```

### 3. ML microservice setup
```bash
cd ml
pip install -r requirements.txt
python app.py
```

### 4. Frontend setup
```bash
cd client
npm install
npm start
```

Visit `http://localhost:3000`

---

## Screenshots

> Coming soon : demo video and screenshots will be added post-deployment.

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
