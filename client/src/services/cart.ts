import { getToken } from "./getToken";

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const removeCartItem = async (productId: string) => {
  const token = await getToken();

  const response = await fetch(`${API_URL}/carts/me/items/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log("Failed to delete cart item", response.status);
    return [];
  }
  return response.json();
};

export const getCart = async () => {
  const token = await getToken();

  const response = await fetch(`${API_URL}/carts/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log("Failed to fetch cart item");
    return [];
  }
  return response.json();
};
