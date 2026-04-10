const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { submitScreening, getScreeningHistory } = require('../controllers/screeningController');

router.post('/submit', auth, submitScreening);
router.get('/history/:childId', auth, getScreeningHistory);

module.exports = router;