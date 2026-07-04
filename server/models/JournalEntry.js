const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
    childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    weekOf: { type: Date, required: true },
    behaviorsObserved: [{ type: String }],
    severityRating: { type: Number, min: 1, max: 5, required: true },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
