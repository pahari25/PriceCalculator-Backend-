const express = require('express');
const Card = require('../Models/Card');
const router = express.Router();

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Card.find({}).sort({ createdAt: -1 });
    res.status(200).json(services);
    console.log('✔ services succesfully fetched.')
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('✘ services not fetched.')

  }
});

// POST a new service
router.post('/', async (req, res) => {
  try {
    const service = await Card.create(req.body);
    res.status(201).json(service);
    console.log('✔ service succesfully created.')
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log('✘ service not created.')
  }
});

// DELETE a service
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Card.findByIdAndDelete(id);
    if (!service) {
        console.log('✘ service not deleted.')
      return res.status(404).json({ error: 'No such service' });
      
    }
    res.status(200).json(service);
    console.log('✔ service succesfully deleted.')
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('✘ service not deleted.')

  }
});

// UPDATE a service
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Card.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!service) {
         console.log('✘ service not updated.')
      return res.status(404).json({ error: 'No such service' });
     
    }
    res.status(200).json(service);
    console.log('✔ service succesfully updated.')
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log('✘ service not updated.')
  }
});

module.exports = router;

