const express = require('express');
const Request = require('../Models/Request');
const router = express.Router();


// Get new Request
router.post('/', async (req, res) => {
    const { token ,user_name, email, services, total, currency } = req.body;
    console.log(req.body)

    if (!email || !services || !total || !currency) {
        return res.status(400).json({ error: 'Missing required fields for email.' });
    }

    try {
        // Save the request to the database
        const newRequest = new Request({ 
            token,
            user_name,   
            email,
            // Map services to match the sub-schema, ensuring price is captured
            services: services.map(s => ({
                name: s.name,
                months: s.months,
                price: s.price,

            })),
            total,
            currency
        });
        await newRequest.save();

    console.log('---- ESTIMATE REQUEST ----');
    console.log('Recipient:', email);
    // await transporter.sendMail({ ... });

    res.status(200).json({ message: 'Estimate sent successfully (simulated).' });
    } catch (error) {
        console.error('Error saving estimate request:', error);
        res.status(500).json({ error: 'Failed to save estimate request.' });
    }
});
 
// GET all estimate requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find({}).sort({ createdAt: -1 });
    res.status(200).json(requests);
    console.log('✔ requests succesfully fetched.')

  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('✘ requests not fetched.')

  }
});

// UPDATE a request status
router.put('/:token', async (req, res) => {
  const { token } = req.params;
  const { status } = req.body;
  console.log(req.params ,status)

  if (!['pending', 'viewed', 'processed'].includes(status)) {
    console.log('✘ Invalid status.')
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const request = await Request.findOneAndUpdate(
      { token: token },
      { status }, 
      { new: true, runValidators: true }
    );
    if (!request) {
      return res.status(404).json({ error: 'No such request' });
    }
    res.status(200).json(request);
    console.log('✔ request status succesfully updated.')
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log('✘ request status not updated.')
  }
});

// DELETE a request
router.delete('/:token', async (req, res) => {
    const { token } = req.params;
    try {
      const request = await Request.findByIdAndDelete(token);
      if (!request) {
        return res.status(404).json({ error: 'No such request' });
        console.log('✘ request not')
      }
      res.status(200).json({ message: 'Request deleted successfully' });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;
