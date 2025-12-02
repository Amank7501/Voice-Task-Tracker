import { parseVoiceText } from "../services/parseService.js";

export const parseVoice = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: "Text is required" });

    const parsed = await parseVoiceText(text);
    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: "Failed to parse voice input" });
  }
};
