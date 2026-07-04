const axios = require('axios');
const Screening = require('../models/Screening');
const Child = require('../models/Child');

const REQUIRED_RESPONSE_FIELDS = [
    'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
    'Age_Mons', 'Sex', 'Jaundice', 'Family_mem_with_ASD'
];

exports.submitScreening = async (req, res) => {
    try {
        const { childId, responses } = req.body;

        if (!childId || !responses || typeof responses !== 'object') {
            return res.status(400).json({ message: 'childId and responses are required' });
        }

        const missing = REQUIRED_RESPONSE_FIELDS.filter(
            (field) => responses[field] === undefined || responses[field] === null || Number.isNaN(Number(responses[field]))
        );
        if (missing.length > 0) {
            return res.status(400).json({ message: `Missing or invalid response fields: ${missing.join(', ')}` });
        }

        const child = await Child.findById(childId);
        if (!child) return res.status(404).json({ message: 'Child not found' });

        // call Flask ML microservice
        let flaskResponse;
        try {
            flaskResponse = await axios.post(`${process.env.FLASK_URL}/predict`, responses);
        } catch (flaskErr) {
            return res.status(502).json({ message: 'Screening service is currently unavailable. Please try again shortly.' });
        }

        const { risk_band, confidence, explanations, disclaimer } = flaskResponse.data;

        // save to MongoDB
        const screening = await Screening.create({
            childId,
            userId: req.user.userId,
            ageBand: child.ageBand,
            responses,
            riskBand: risk_band,
            confidence,
            explanations,
            disclaimer
        });

        res.status(201).json({
            screeningId: screening._id,
            riskBand: risk_band,
            confidence,
            explanations,
            disclaimer,
            ageBand: child.ageBand
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getScreeningHistory = async (req, res) => {
    try {
        const { childId } = req.params;
        const screenings = await Screening.find({ childId }).sort({ createdAt: -1 });
        res.json(screenings);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};