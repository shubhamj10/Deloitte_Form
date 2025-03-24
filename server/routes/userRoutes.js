const express = require('express');
const router = express.Router();
const { register, login, authenticateToken } = require('../utils/auth');

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body.finalData;
  console.log(req.body);
  try {
    const token = await register(username, email, password, role);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const token = await login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/protected', authenticateToken, (req, res) => {
  res.status(200).send('This is a protected route');
});

module.exports = router;
