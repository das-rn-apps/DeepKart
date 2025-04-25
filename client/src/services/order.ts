import { getToken } from "./getToken";

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getOrders = async () => {
  const token = await getToken();

  const response = await fetch(`${API_URL}/orders/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    return [];
  }
  return response.json();
};

export const getOrderById = async (orderId: string) => {
  const response = await fetch(`${API_URL}/orders/${orderId}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
};
