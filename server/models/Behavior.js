const mongoose = require('mongoose');

const behaviorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    ageRelevance: { type: String },
    concernLevel: { type: String },
    whatToObserve: { type: String },
    ageBands: [{ type: String }],
    tags: [{ type: String }]
});

module.exports = mongoose.model('Behavior', behaviorSchema);