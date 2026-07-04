const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/children', require('./routes/child'));
app.use('/api/screening', require('./routes/screening'));
app.use('/api/behaviors', require('./routes/behaviors'));
app.use('/api/journal', require('./routes/journal'));

app.get('/', (req, res) => {
    res.json({ message: 'Spectra API is running' });
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
    .catch(err => console.log(err));