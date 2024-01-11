const express = require('express');
const router = express.Router();
const User=require('../models/user')

// API for updating user details 
router.put('/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const newDetails = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (newDetails.username) user.username = newDetails.username;
        if (newDetails.email) user.email = newDetails.email;
        if (newDetails.password) user.password = newDetails.password;
        await user.save();

        res.json({ success: true, message: 'User details updated successfully' });
    } catch (error) {
        console.error('Error during user update:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


// API FOR DELETING A USER
router.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error during user deletion:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// exporting router
module.exports=router;