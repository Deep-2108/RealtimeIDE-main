import express from "express";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

dotenv.config();

const router = express.Router();

const ai = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  temperature: 0.2,
  maxOutputTokens: 1024,
});

router.post("/", async (req, res) => {
  try {
    const { message, codeContext } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const messages = [
      new SystemMessage(
        "You are a smart programming assistant for a collaborative IDE. Provide clear and concise programming-focused answers."
      ),
      new HumanMessage(
        `Current code context:
${codeContext || "No code provided"}

User question:
${message}`
      ),
    ];

    const response = await ai.invoke(messages);

    return res.status(200).json({
      reply:
        typeof response.content === "string"
          ? response.content
          : JSON.stringify(response.content),
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      error: error.message || "Failed to generate response",
    });
  }
});

export default router;