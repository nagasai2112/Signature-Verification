const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');  // File system operations
const authRoutes = require('./routes/authRoutes');  // Authentication routes
const { verifySignature } = require('./utils/verifySignature'); // Signature verification utility
const Signature = require('./models/Signature'); // Signature model

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Authentication routes

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Image upload setup (using multer)
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'uploads/';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);  // Create uploads directory if it doesn't exist
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Create unique filename
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
    }
    cb(null, true);
  }
});

// Route for uploading signature image
app.post('/upload-signature', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  try {
    // Save file information to the database
    const signature = new Signature({
      fileName: req.file.filename,
      filePath: req.file.path,
    });

    await signature.save();

    res.status(200).send({ message: 'Image uploaded successfully', file: req.file });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error saving image to database' });
  }
});

// Route for verifying signature
app.post('/verify-signature', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded for verification' });
  }

  try {
    // Assuming verifySignature is a function that performs the signature verification
    const result = await verifySignature(req.file.path);  // Ensure verifySignature works correctly

    // Assuming the result contains verificationResult and confidence
    const { verificationResult, confidence } = result;

    // Save verification result to the database
    const verificationData = {
      verificationResult: verificationResult,
      confidence: confidence,
    };

    // Optionally update the signature document with verification results
    await Signature.updateOne(
      { filePath: req.file.path },
      { $set: verificationData }
    );

    // Send both verificationResult and confidence back to the client
    res.status(200).send({
      verificationResult: verificationResult,  // "Genuine" or "Forged"
      confidence: confidence,  // Confidence percentage
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error verifying signature. Please try again later.' });
  }
});

// Error handling middleware for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send({ message: err.message });
  }
  res.status(500).send({ message: 'An unexpected error occurred' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
