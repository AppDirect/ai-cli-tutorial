import axios from "axios";
import { SSE } from "sse.js";

export const listAIs = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.API_URL}/api/v1/me/ai?scope=OWNED`,
      headers: {
        "X-Authorization": `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

export const createAI = async (name, description, instructions, src) => {
  if (!instructions) {
    instructions = description;
  }
  if (!src) {
    src =
      "https://res.cloudinary.com/dwyqkq1hq/image/upload/ro0duemq1iium4odnx6n.webp";
  }

  try {
    const response = await axios({
      method: "post",
      url: `${process.env.API_URL}/api/v1/ai`,
      data: { name, description, instructions, src },
      headers: {
        "X-Authorization": `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

export const createChat = async (aiId) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.API_URL}/api/v1/ai/${aiId}/chats`,
      headers: {
        "X-Authorization": `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

export const sendMessage = async (chatId, message) => {
  try {
    const eventSource = new SSE(  
      `${process.env.API_URL}/api/v1/chats/${chatId}`,
      {
        start: false,
        method: "POST",
        withCredentials: true,
        payload: JSON.stringify({
          prompt: message,
          date: new Date(),
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-Authorization": `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    return eventSource;
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};
