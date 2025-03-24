const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  questions: [
    {
      text: { 
        type: String, 
        required: true, 
        trim: true 
      },
      ratingOptions: [
        { 
          type: mongoose.Schema.Types.Mixed 
        }
      ],
    },
  ],
}, {
  timestamps: true 
});

module.exports = mongoose.model('Form', formSchema);
