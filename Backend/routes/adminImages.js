// // routes/adminImages.js

// // import Image from '../models/Image.js';
// // import { verifyAdmin } from '../middleware/auth.js';
// const express = require('express');
// const verifyAdmin = require('../middleware/auth');
// const Image=require('../models/Images')
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const mongoose = require('mongoose');




// const storage = multer.diskStorage({
//   destination: 'uploads/',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// router.post('/upload-file', verifyAdmin, upload.single('image'), async (req, res) => {

//   if (!req.file) return res.status(400).json({ message: 'No file received' });

//   try {
//     const image = new Image({
//       url: `/uploads/${req.file.filename}`,
//       title: req.body.title,
//       uploadedBy: req.user._id
//     });
//     await image.save();
//     res.status(201).json({ message: 'Image uploaded', image });
//   } catch (err) {
//     console.log('❌ Upload error:', err.message);
//     res.status(500).json({ message: 'Upload failed', error: err.message });
//   }
// });



// // Get all images by admin as well as user
// router.get('/', verifyAdmin, async (req, res) => {
//   const images = await Image.find().sort({ createdAt: -1 });
//   res.json(images);
// });

// // delete the images by admin
// router.delete('/:id', verifyAdmin, async (req, res) => {
//   const { id } = req.params;


//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: 'Invalid image ID' });
//   }

//   try {
//     const image = await Image.findById(id);
//     if (!image) return res.status(404).json({ message: 'Image not found' });

//     await image.deleteOne();
//     res.json({ message: 'Image deleted successfully' });
//   } catch (err) {
//     console.error('❌ Delete error:', err);
//     res.status(500).json({ message: 'Server error during deletion' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Image = require('../models/Images');

const authenticateUser = require('../middleware/authMiddleware');      
const verifyAdmin = require('../middleware/verifyAdmin');   

const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// 🖼️ View all images — accessible to logged-in users (admin or user)
router.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

// 📤 Upload image — admin only
router.post('/upload-file', authenticateUser, verifyAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file received' });

  try {
    const image = new Image({
      url: `/uploads/${req.file.filename}`,
      title: req.body.title,
      uploadedBy: req.user._id
    });
    await image.save();
    res.status(201).json({ message: 'Image uploaded', image });
  } catch (err) {
    console.log('❌ Upload error:', err.message);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// 🗑️ Delete image — admin only
router.delete('/:id', authenticateUser, verifyAdmin, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid image ID' });
  }

  try {
    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    await image.deleteOne();
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ message: 'Server error during deletion' });
  }
});

module.exports = router;