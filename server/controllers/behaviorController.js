const Behavior = require('../models/Behavior');

exports.getBehaviors = async (req, res) => {
    try {
        const { search, ageBand, concernLevel } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        if (ageBand) query.ageBands = ageBand;
        if (concernLevel) query.concernLevel = concernLevel;

        const behaviors = await Behavior.find(query);
        res.json(behaviors);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};