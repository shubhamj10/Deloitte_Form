const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const SECRET_KEY = 'your_jwt_secret_key';

async function register(username, email, password, role) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, role });
  await user.save();
  return generateToken(user);
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password.');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }
  return generateToken(user);
}

function generateToken(user) {
  return jwt.sign({
    id: user._id,
    role: user.role
  }, SECRET_KEY, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    console.log(verified);
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}

module.exports = {
  register,
  login,
  authenticateToken
};
