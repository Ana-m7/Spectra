# Deploying Spectra

Spectra deploys as three pieces:

| Piece | Platform | Cost |
|---|---|---|
| React client (`client/`) | Vercel | Free |
| Node API (`server/`) | Render (web service) | Free tier |
| Flask ML service (`ml/`) | Render (web service) | Free tier |
| Database | MongoDB Atlas | Free tier (already set up) |

Deploy in this order — **ML service → API → client** — because each one needs the previous one's URL.

> **Free-tier caveat:** Render free services spin down after ~15 minutes of inactivity. The first request after idle takes 30–60 seconds while the service wakes up. The API's call to the ML service already uses a 60s timeout to tolerate this.

---

## 0. Prerequisites

- Code pushed to GitHub
- A [Render](https://render.com) account and a [Vercel](https://vercel.com) account (both free, sign in with GitHub)
- MongoDB Atlas cluster

### Atlas: allow Render to connect

In Atlas → **Network Access** → Add IP Address → **Allow access from anywhere** (`0.0.0.0/0`). Render free-tier services don't have static IPs, so this is the standard approach; the database is still protected by its username/password.

---

## 1. Deploy both backend services on Render (Blueprint)

The repo includes [`render.yaml`](render.yaml), which defines both services.

1. Render Dashboard → **New → Blueprint** → select the Spectra repo.
2. Render detects `render.yaml` and shows two services: `spectra-api` and `spectra-ml`.
3. When prompted for environment variables:
   - `MONGO_URI` → your Atlas connection string (with database name, e.g. `...mongodb.net/spectra`)
   - `CLIENT_ORIGIN` → leave blank for now (you'll set it after deploying the client)
   - `JWT_SECRET` is auto-generated; `FLASK_URL` is wired automatically to the ML service's URL.
4. Click **Apply** and wait for both services to build and go live.
5. Sanity check in the browser:
   - `https://spectra-ml-XXXX.onrender.com/health` → `{"status": "Spectra ML service is running"}`
   - `https://spectra-api-XXXX.onrender.com/api/health` → `{"status": "ok"}`

### Seed the Behavior Library (one-time)

The Behavior Library needs its 28 entries seeded into Atlas. Run this once **from your local machine**, with `server/.env` pointing `MONGO_URI` at the production Atlas database:

```bash
cd server
node config/seedBehaviors.js
```

---

## 2. Deploy the client on Vercel

1. Vercel Dashboard → **Add New → Project** → import the Spectra repo.
2. Set **Root Directory** to `client` (Vercel then auto-detects Create React App).
3. Under **Environment Variables**, add:
   - `REACT_APP_API_URL` = `https://spectra-api-XXXX.onrender.com/api` (your Render API URL + `/api`)
4. Deploy. The included `client/vercel.json` rewrite makes react-router deep links (e.g. `/result`) work on refresh.

---

## 3. Close the CORS loop

Back in Render → `spectra-api` → **Environment**:

- Set `CLIENT_ORIGIN` = your Vercel URL, e.g. `https://spectra.vercel.app` (no trailing slash).

The service redeploys automatically. Until this is set, the deployed client's API calls will be blocked by CORS — that's the allowlist working as intended.

---

## 4. Verify end-to-end

1. Open the Vercel URL.
2. Register a new account and log in.
3. Add a child, run a screening, and check the Result, Roadmap, Behavior Library, and Journal pages.
4. If the first screening submission is slow, that's the ML service cold-starting — subsequent ones are fast.

Finally, update the **Live Demo** links in [README.md](README.md).

---

## Environment variable reference

### `server/` (see `server/.env.example`)

| Variable | Purpose |
|---|---|
| `PORT` | API port (Render sets this automatically) |
| `MONGO_URI` | Atlas connection string |
| `JWT_SECRET` | Signing key for auth tokens |
| `FLASK_URL` | Base URL of the ML service |
| `CLIENT_ORIGIN` | Deployed frontend origin allowed by CORS |

### `client/` (see `client/.env.example`)

| Variable | Purpose |
|---|---|
| `REACT_APP_API_URL` | API base URL incl. `/api`; defaults to `http://localhost:5000/api` |

### `ml/`

| Variable | Purpose |
|---|---|
| `PORT` | Service port (Render sets this; defaults to 5001 locally) |
| `FLASK_DEBUG` | `true` enables Flask debug mode (local only — never in production) |
