const Child = require('../models/Child');

// screening covers children up to ~5 years old (the "48m+" band); a few
// months of slack keeps almost-6-year-olds in scope without accepting ages
// the tool was never designed for
const MAX_AGE_MONTHS = 72;

const getAgeInMonths = (dob) => Math.floor((Date.now() - new Date(dob)) / (1000 * 60 * 60 * 24 * 30));

const getAgeBand = (dob) => {
    const months = getAgeInMonths(dob);
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

        const dob = new Date(dateOfBirth);
        if (Number.isNaN(dob.getTime())) {
            return res.status(400).json({ message: 'dateOfBirth is not a valid date' });
        }
        if (dob.getTime() > Date.now()) {
            return res.status(400).json({ message: 'dateOfBirth cannot be in the future' });
        }
        if (getAgeInMonths(dob) > MAX_AGE_MONTHS) {
            return res.status(400).json({ message: 'Spectra is designed for children under 6 years old' });
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
