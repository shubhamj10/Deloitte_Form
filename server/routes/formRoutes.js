const express = require('express');
const Form = require('../models/Form');
const Survey = require('../models/Survey');
const { authenticateToken } = require('../utils/auth');
const User = require('../models/User');
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const surveys = await Survey.find({ submittedByUser: true }).populate('user').exec();
    res.json(surveys); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch submissions.' });
  }
});


router.get('/submission/:id', async (req, res) => {
  try {
    const form = await Survey.findById(req.params.id).populate('user').exec();
    if (!form) {
      return res.status(404).json({ message: 'Submission not found.' });
    }
    res.json(form);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch submission details.' });
  }
});




router.post('/submit', authenticateToken, async (req, res) => {
  const { categoryName, ratings } = req.body;
  const { id } = req.user;

  console.log("Request body received:", req.body);
  console.log("User from token:", req.user);

  if (!categoryName || !ratings || ratings.length === 0) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  if (ratings.some(r => !r.question || r.ratings === undefined)) {
    return res.status(400).json({ message: 'Invalid ratings format.' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newSurvey = new Survey({
      categoryName,
      ratings,
      user: user._id,
    });

    console.log("New survey object:", newSurvey);

    const savedSurvey = await newSurvey.save();

    res.status(200).json({
      message: 'Survey ratings saved successfully!',
      data: savedSurvey,
    });
  } catch (error) {
    console.error('Detailed error:', error.stack || error);
    res.status(500).json({ message: 'Failed to save survey responses.' });
  }
});


router.get('/', (req, res) => res.send('API is running...'));

module.exports = router;
