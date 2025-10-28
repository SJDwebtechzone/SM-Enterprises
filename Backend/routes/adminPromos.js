const express = require('express');
const Promo= require('../models/Promo')

const router = express.Router();

// Create a new promo
router.post('/', async (req, res) => {
  const { message, active } = req.body;
  try {
    const newPromo = new Promo({ message, active });
    await newPromo.save();
    res.status(201).json(newPromo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create promo' });
  }
});

// Toggle promo active status
router.put('/:id/toggle', async (req, res) => {
  try {
    const promo = await Promo.findById(req.params.id);
    promo.active = !promo.active;
    await promo.save();
    res.json(promo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle promo' });
  }
});

// Delete a promo
router.delete('/:id', async (req, res) => {
  try {
    await Promo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Promo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete promo' });
  }
});

module.exports = router;