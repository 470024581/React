import dbConnect from '../../../lib/dbConnect';
import Item from '../../../models/Item';

export default async function handler(req, res) {
  const { method } = req;

  // Connect to database
  await dbConnect();

  switch (method) {
    // Get all items
    case 'GET':
      try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.status(200).json(items);
      } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Failed to fetch items', error: error.message });
      }
      break;

    // Create new item
    case 'POST':
      try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
      } catch (error) {
        console.error('Error creating item:', error);
        res.status(400).json({ message: 'Failed to create item', error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}