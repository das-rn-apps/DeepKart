import { getToken } from "./getToken";
const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL; // Replace with your API URL

export const getAddresses = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch addresses");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

export const getAddressById = async (addressId: any) => {
  try {
    const token = await getToken(); // Implement getToken() to retrieve the user's JWT token
    const response = await fetch(`${API_URL}/users/me/${addressId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch address");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error; // Rethrow the error to be handled by the component
  }
};
