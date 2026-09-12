const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

// fail fast on missing configuration instead of crashing at first use
const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET', 'FLASK_URL'];
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
    console.error(`Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
}

const app = express();

// Render (and most hosts) sit behind a reverse proxy — needed so
// express-rate-limit sees the real client IP, not the proxy's
app.set('trust proxy', 1);

app.use(helmet());

// only allow the deployed frontend and local dev to call the API
const allowedOrigins = [process.env.CLIENT_ORIGIN, 'http://localhost:3000'].filter(Boolean);
app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

// brute-force protection on login/register only
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many attempts. Please try again in 15 minutes.' }
});

// routes
app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/children', require('./routes/child'));
app.use('/api/screening', require('./routes/screening'));
app.use('/api/behaviors', require('./routes/behaviors'));
app.use('/api/journal', require('./routes/journal'));

app.get('/', (req, res) => {
    res.json({ message: 'Spectra API is running' });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', allowedOrigins });
});

// centralized error handler — catches malformed JSON bodies (express.json())
// and anything else that falls through, instead of leaking a stack trace
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Invalid JSON in request body' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });
