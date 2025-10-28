const express = require('express');
const router = express.Router();
const CategoryCollection = require('../models/CategoryCollection');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET /api/categories — fetch all active categories
router.get('/', async (req, res) => {
  try {
    const categories = await CategoryCollection.find({ status: 'active' });
    res.json(categories);
  } catch (err) {
    console.error('Category fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST /api/categories/add — add a new category with image
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const category = new CategoryCollection({ name, image: imagePath });
    await category.save();
    res.status(201).json({ message: 'Category added successfully', category });
  } catch (err) {
    console.error('Category add error:', err);
    res.status(500).json({ message: 'Error adding category' });
  }
});

// DELETE /api/categories/:id — delete category
router.delete('/:id', async (req, res) => {
  try {
    await CategoryCollection.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Error deleting category' });
  }
});

module.exports = router;