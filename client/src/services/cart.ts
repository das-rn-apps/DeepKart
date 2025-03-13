import { Alert } from "react-native";
import { getToken } from "./getToken";

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const addCartItem = async (productId: string) => {
  const token = await getToken();

  try {
    const response = await fetch(`${API_URL}/carts/me/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Failed to add quantity:",
        errorData.message || "Unknown error"
      );
      throw new Error(errorData.message || "Failed to add quantity");
    }
    const data = await response.json();
    Alert.alert("Added", "Item successfully added to your cart");

    return data;
  } catch (error) {
    Alert.alert("Error", "Failed to add quantity. Please try again.");
    throw error;
  }
};

export const updateCartItemQuantity = async (
  productId: string,
  quantity: number
) => {
  const token = await getToken();

  try {
    const response = await fetch(`${API_URL}/carts/me/items/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Failed to update quantity:",
        errorData.message || "Unknown error"
      );
      throw new Error(errorData.message || "Failed to update quantity");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    Alert.alert("Error", "Failed to update quantity. Please try again.");
    throw error;
  }
};

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
