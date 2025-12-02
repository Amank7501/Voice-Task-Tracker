import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const parseVoiceText = async (text) => {
  const prompt = `
Extract the following fields from the given natural language text:
- title
- dueDate (ISO format)
- priority (low/medium/high)
- status (todo/in-progress/done)

If something is not mentioned, return null or sensible default.
Return JSON only.

Text: "${text}"
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(completion.choices[0].message.content);
};
