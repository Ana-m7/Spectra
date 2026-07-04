const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createEntry, getHistory } = require('../controllers/journalController');

router.post('/', auth, createEntry);
router.get('/history/:childId', auth, getHistory);

module.exports = router;
