const axios = require('axios');
const Screening = require('../models/Screening');
const Child = require('../models/Child');

exports.submitScreening = async (req, res) => {
    try {
        const { childId, responses } = req.body;

        const child = await Child.findById(childId);
        if (!child) return res.status(404).json({ message: 'Child not found' });

        // call Flask ML microservice
        const flaskResponse = await axios.post(
            `${process.env.FLASK_URL}/predict`,
            responses
        );

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
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getScreeningHistory = async (req, res) => {
    try {
        const { childId } = req.params;
        const screenings = await Screening.find({ childId }).sort({ createdAt: -1 });
        res.json(screenings);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};