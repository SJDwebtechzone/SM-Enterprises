const express = require('express');
// import Promo from '../models/Promo.js';
const Promo= require('../models/Promo')

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const promos = await Promo.find({ active: true });
    res.json(promos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch promos' });
  }
});

module.exports = router;