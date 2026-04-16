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

app.get('/', (req, res) => {
    res.json({ message: 'Spectra API is running' });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => console.log(err));