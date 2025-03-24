const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
  accessibleForms: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

async function checkUserFormAccess(userId, formId) {
  const user = await User.findById(userId);
  return user.role === 'admin' || user.accessibleForms.includes(formId);
}

async function grantFormAccess(adminId, userId, formId) {
  const admin = await User.findById(adminId);
  if (admin.role !== 'admin') {
    throw new Error('Only admins can grant access.');
  }
  await User.findByIdAndUpdate(userId, {
    $addToSet: { accessibleForms: formId },
  });
}

module.exports = Mongoose.model('User', userSchema);
