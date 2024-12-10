const express = require('express');
const router = express.Router();

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await req.db.select('clients');
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

// Get client by ID
router.get('/:id', async (req, res) => {
  try {
    const client = await req.db.select(`clients:${req.params.id}`);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch client' });
  }
});

// Create client
router.post('/', async (req, res) => {
  try {
    const client = await req.db.create('clients', {
      ...req.body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create client' });
  }
});

// Update client
router.put('/:id', async (req, res) => {
  try {
    const client = await req.db.change('clients', req.params.id, {
      ...req.body,
      updated_at: new Date().toISOString()
    });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update client' });
  }
});

// Delete client
router.delete('/:id', async (req, res) => {
  try {
    await req.db.delete('clients', req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete client' });
  }
});

module.exports = router;