const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const getProductById = async (productId: string) => {
  const response = await fetch(`${API_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
};

// Add other product-related services (create, update, delete)
