import mongoose from 'mongoose';

/* 
  If the model is already compiled, use the existing model
  This is to prevent errors from duplicate model compilation during hot reload in development mode
*/
const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  }
}, { timestamps: true });

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);