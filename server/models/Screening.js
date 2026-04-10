const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
    childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ageBand: { type: String, required: true },
    responses: { type: Object, required: true },
    riskBand: { type: String, required: true },
    confidence: { type: Number, required: true },
    explanations: { type: Array, required: true },
    disclaimer: { type: String, default: 'This is not a clinical diagnosis.' }
}, { timestamps: true });

module.exports = mongoose.model('Screening', screeningSchema);