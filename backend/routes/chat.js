import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message, codeContext } = req.body;

    const prompt = `
You are a smart programming assistant for a collaborative IDE.

Current code context:
${codeContext || "No code provided"}

User question:
${message}

Give a clear and concise programming-focused answer.
`;

    const chat = ai.chats.create({
      model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
    });

    const response = await chat.sendMessage({
      message: prompt,
    });

    return res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      error: error.message || "Failed to generate response",
    });
  }
});

export default router;