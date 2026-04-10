const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    ageBand: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Child', childSchema);