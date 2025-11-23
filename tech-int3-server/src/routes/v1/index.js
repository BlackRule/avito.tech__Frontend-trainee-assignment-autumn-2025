const express = require('express');
const router = express.Router();

const adsRoutes = require('./ads');
const statsRoutes = require('./stats');
const moderatorsRoutes = require('./moderators');

router.use('/ads', adsRoutes);
router.use('/stats', statsRoutes);
router.use('/moderators', moderatorsRoutes);
router.use('/categories', require('./categories'));

const { resetData } = require('../../models/v1/data');
router.post('/reset', (req, res) => {
    resetData();
    res.json({ message: 'Data reset successfully' });
});

module.exports = router;
