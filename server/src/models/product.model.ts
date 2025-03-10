import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string;
  category: mongoose.Types.ObjectId;
  brand: string;
  stock: number;
  attributes: Record<string, any>;
  ratings: number;
  reviews: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  images: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: { type: String },
  stock: { type: Number, required: true },
  attributes: { type: Schema.Types.Mixed },
  ratings: { type: Number, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  sellerId: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProduct>('Product', productSchema);