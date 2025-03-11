export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string;
  category: string;
  brand: string;
  stock: number;
  attributes: Record<string, any>;
  ratings: number;
  reviews: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress {
  _id: string;
  userId: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  isDefault: Boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentCategory?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  _id: string;
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  shippingMethod: string;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}
