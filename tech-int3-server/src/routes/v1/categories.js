const express = require('express');
const router = express.Router();
const dataStore = require('../../models/v1/data');

router.get('/', (req, res) => {
    const categories = dataStore.categories.map((name, index) => ({
        id: index,
        name
    }));
    res.json(categories);
});

module.exports = router;
