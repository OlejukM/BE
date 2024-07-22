const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Model = require('../models/Details');

router.get('/', async (req, res, next) => {
  try {
    const data = await Model.find();

    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.post('/', (req, res) => {
  const { name, partNumber, price, note } = req.body;

  const data = new Model({
    name,
    partNumber,
    price,
    note,
  })

  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/:partNumber', async (req, res) => {
  const { partNumber } = req.params;
  const { newPrice } = req.body;

  try {
      const detail = await Model.findOne({ partNumber });

      if (!detail) {
          return res.status(404).json({ error: 'Detail not found' });
      }

      const oldPrice = detail.price;
      detail.price = newPrice;
      
      detail.priceChangeHistory.push({
          oldPrice,
          newPrice,
          changeDate: new Date()
      });

      await detail.save();

      res.json(detail); 
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
