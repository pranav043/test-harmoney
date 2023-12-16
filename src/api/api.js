import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://mapi.harmoney.dev/api/v1";
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN || "NO_TOKEN";

export const getMessages = async () => {
  try {
    const response = await axios.get(`${API_URL}/messages/`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const postMessage = async (text) => {
  try {
    await axios.post(
      `${API_URL}/messages/`,
      {
        text: text.trim(),
      },
      {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }
    );
  } catch (error) {
    console.error("Error submitting message:", error);
    throw error;
  }
};

export const deleteMessage = async (id) => {
  try {
    await axios.delete(`${API_URL}/messages/${id}/`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};
