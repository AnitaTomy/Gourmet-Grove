const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.post('/search', async (req, res) => {
    try {
        const { category, course } = req.body;

        if (!category && !course) {
            return res.status(400).json({ success: false, message: 'Please provide at least one of category or course.' });
        }
        const query = {};
        if (category) {
            query.category = category;
        }
        if (course) {
            query.course = course;
        }

        const recipes = await Recipe.find(query);

        if (recipes.length === 0) {
            return res.status(404).json({ success: false, message: 'No recipes found for the provided category and course.' });
        }

        res.json({ success: true, recipes });
    } catch (error) {
        console.error('Error during recipe search:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
