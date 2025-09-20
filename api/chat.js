import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.generateText({
      model: 'gemini-2.5-flash-lite',
      messages: [
        { role: 'user', content: message }
      ],
    });

    const reply = response?.candidates?.[0]?.content?.[0]?.text || "No response.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Server error." });
  }
}
