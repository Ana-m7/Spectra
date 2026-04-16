const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getBehaviors } = require('../controllers/behaviorController');

router.get('/', auth, getBehaviors);

module.exports = router;