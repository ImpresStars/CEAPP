const express = require('express');
const router = express.Router();

// Get all workers
router.get('/', async (req, res) => {
  try {
    const workers = await req.db.select('workers');
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

// Get worker by ID
router.get('/:id', async (req, res) => {
  try {
    const worker = await req.db.select(`workers:${req.params.id}`);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch worker' });
  }
});

// Create worker
router.post('/', async (req, res) => {
  try {
    const worker = await req.db.create('workers', {
      ...req.body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    res.status(201).json(worker);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create worker' });
  }
});

// Update worker
router.put('/:id', async (req, res) => {
  try {
    const worker = await req.db.change('workers', req.params.id, {
      ...req.body,
      updated_at: new Date().toISOString()
    });
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update worker' });
  }
});

// Delete worker
router.delete('/:id', async (req, res) => {
  try {
    await req.db.delete('workers', req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete worker' });
  }
});

module.exports = router;