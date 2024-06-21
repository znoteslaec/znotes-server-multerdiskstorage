// models/studentModel.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  usn: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true,
  },


  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester' },
  scheme: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' },
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  registeredAt: { type: Date, default: Date.now }
});




// json web token

studentSchema.methods.generateToken = async function () {
  try {

    return jwt.sign(

      {
        userID: this.usn
      
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3d"
      }

    );

  } catch (error) {
    console.error(error);

  }
}



const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
