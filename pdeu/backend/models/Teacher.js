const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  cabinNumber: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // URL to the uploaded photo
    required: false,
  },
  availableSlots: {
    type: Map, // A map of days to time slots
    of: [String],
    required: true,
  },
});

const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;
