const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Item schema
const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  }
}, { timestamps: true });

// Create Item model
const Item = mongoose.model('Item', itemSchema);

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error(`Error fetching item ID:${req.params.id}:`, error);
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
});

// Create new item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(400).json({ message: 'Error creating item', error: error.message });
  }
});

// Update item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error(`Error updating item ID:${req.params.id}:`, error);
    res.status(400).json({ message: 'Error updating item', error: error.message });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(`Error deleting item ID:${req.params.id}:`, error);
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});

module.exports = router;