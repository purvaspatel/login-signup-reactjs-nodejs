const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const Teacher = require('./models/Teacher');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });
// Replace with your MongoDB connection string
const mongoURI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Route to handle teacher registration
app.post('/api/teachers', upload.single('photo'), async (req, res) => {
  try {
    const { name, email, department, cabinNumber, availableSlots } = req.body;

    // If there's a photo uploaded, save its path
    const photo = req.file ? req.file.path : null;

    // Parse the availableSlots JSON string into a JavaScript object
    const parsedSlots = JSON.parse(availableSlots);

    const newTeacher = new Teacher({
      name,
      email,
      department,
      cabinNumber,
      photo,
      availableSlots: parsedSlots,
    });

    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error('Error saving teacher:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
