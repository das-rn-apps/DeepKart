import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly define _id type
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  addresses: mongoose.Types.ObjectId[];
  phoneNumber: string;
  profilePicture?: string;
  wishlist: mongoose.Types.ObjectId[];
  orderHistory: mongoose.Types.ObjectId[];
  reviews: mongoose.Types.ObjectId[];
  ratings: mongoose.Types.ObjectId[];
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  phoneNumber: { type: String, required: true },
  profilePicture: { type: String },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', userSchema);