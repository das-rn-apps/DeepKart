const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }
  return response.json();
};

export const getCategoryById = async (categoryId: string | string[]) => {
  const response = await fetch(`${API_URL}/categories/${categoryId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }
  return response.json();
};
