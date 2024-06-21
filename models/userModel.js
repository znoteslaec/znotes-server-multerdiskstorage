const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
   
  },
  role: {
    type: String,
    required: true,
    
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
