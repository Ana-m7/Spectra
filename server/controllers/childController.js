const Child = require('../models/Child');

const getAgeBand = (dob) => {
    const months = Math.floor((Date.now() - new Date(dob)) / (1000 * 60 * 60 * 24 * 30));
    if (months <= 15) return '12m';
    if (months <= 21) return '18m';
    if (months <= 30) return '24m';
    if (months <= 42) return '36m';
    return '48m+';
};

exports.addChild = async (req, res) => {
    try {
        const { name, dateOfBirth, sex, jaundice, familyMemberWithASD } = req.body;

        if (!name || !dateOfBirth || !sex) {
            return res.status(400).json({ message: 'name, dateOfBirth, and sex are required' });
        }
        if (!['male', 'female'].includes(sex)) {
            return res.status(400).json({ message: 'sex must be either "male" or "female"' });
        }

        const ageBand = getAgeBand(dateOfBirth);
        const child = await Child.create({
            userId: req.user.userId,
            name,
            dateOfBirth,
            ageBand,
            sex,
            jaundice: Boolean(jaundice),
            familyMemberWithASD: Boolean(familyMemberWithASD)
        });
        res.status(201).json(child);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getChildren = async (req, res) => {
    try {
        const children = await Child.find({ userId: req.user.userId });
        res.json(children);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
