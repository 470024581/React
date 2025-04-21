import dbConnect from '../../../lib/dbConnect';
import Item from '../../../models/Item';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  // Connect to database
  await dbConnect();

  switch (method) {
    // Get single item
    case 'GET':
      try {
        const item = await Item.findById(id);
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
      } catch (error) {
        console.error(`Error fetching item ID:${id}:`, error);
        res.status(500).json({ message: 'Failed to fetch item details', error: error.message });
      }
      break;

    // Update item
    case 'PUT':
      try {
        const updatedItem = await Item.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }
        );
        if (!updatedItem) {
          return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
      } catch (error) {
        console.error(`Error updating item ID:${id}:`, error);
        res.status(400).json({ message: 'Failed to update item', error: error.message });
      }
      break;

    // Delete item
    case 'DELETE':
      try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
          return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
      } catch (error) {
        console.error(`Error deleting item ID:${id}:`, error);
        res.status(500).json({ message: 'Failed to delete item', error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}