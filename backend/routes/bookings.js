const express = require('express');
const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await req.db.select('bookings');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Create booking
router.post('/', async (req, res) => {
  try {
    const booking = await req.db.create('bookings', {
      ...req.body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Update booking
router.put('/:id', async (req, res) => {
  try {
    const booking = await req.db.change('bookings', req.params.id, {
      ...req.body,
      updated_at: new Date().toISOString()
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    await req.db.delete('bookings', req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;