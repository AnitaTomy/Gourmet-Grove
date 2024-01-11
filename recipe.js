const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// API to add a new recipe
router.post('/addRecipe', async (req, res) => {
    try {
        const { userId,title, description, ingredients, steps, image, category, course } = req.body;
        const newRecipe = new Recipe({ userId,title, description, ingredients, steps, image, category, course });
        await newRecipe.save();
        res.status(201).json({ success: true, message: 'Recipe added successfully', recipe: newRecipe });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'error' });
    }
});

// API to update a recipe
router.put('/updateRecipe/:id', async (req, res) => {
    try {
        const { userId,title, description, ingredients, steps, image, category, course } = req.body;
        const existingRecipe = await Recipe.findById(req.params.id);

        // Check if the recipe exists
        if (!existingRecipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        // Update the recipe details
        existingRecipe.userId = userId || existingRecipe.userId;
        existingRecipe.title = title || existingRecipe.title;
        existingRecipe.description = description || existingRecipe.description;
        existingRecipe.ingredients = ingredients || existingRecipe.ingredients;
        existingRecipe.steps = steps || existingRecipe.steps;
        existingRecipe.image = image || existingRecipe.image;
        existingRecipe.category = category || existingRecipe.category;
        existingRecipe.course = course || existingRecipe.course;

        await existingRecipe.save();

        res.json({ success: true, message: 'Recipe updated successfully', recipe: existingRecipe });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'error' });
    }
});

// API to delete a recipe
router.delete('/deleteRecipe/:id', async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!deletedRecipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        res.json({ success: true, message: 'Recipe deleted successfully', recipe: deletedRecipe });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// API to view all the available recipe
router.get('/getAllRecipes', async (req, res) => {
    try {
        // Fetch all recipes from the database
        const recipes = await Recipe.find();
        
        res.status(200).json({ success: true, recipes });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error fetching recipes' });
    }
});





// Export the router
module.exports = router;


