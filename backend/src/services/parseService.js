// import dotenv from "dotenv";
// dotenv.config();

// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const parseVoiceText = async (text) => {
//   try {
//     const prompt = `
// Extract these fields from the following natural language input:

// - title
// - description
// - dueDate (convert relative dates like tomorrow, next Monday)
// - priority (low / medium / high)
// - status (todo / in-progress / done)

// Return ONLY JSON.

// Text: "${text}"
// `;

//     const response = await client.responses.create({
//       model: "gpt-4o-mini",
//       input: prompt,
//     });

//     const output = response.output_text; // Response text
//     return JSON.parse(output);

//   } catch (error) {
//     console.error("Parse Service Error:", error.message);
//     throw error;
//   }
// };


import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const parseVoiceText = async (text) => {
  try {
    const prompt = `
Extract the following fields from the text below:

- title
- description
- priority (low/medium/high)
- status (todo/in-progress/done)
- dueDate (convert natural date phrases like "tomorrow" or "next Monday" to ISO)

Return ONLY valid JSON object. No markdown code blocks. No backticks. No explanations.

Text: "${text}"
`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    let output = response.choices[0].message.content;

    // Remove markdown code fences if model adds them
    output = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(output);

  } catch (error) {
    console.error("Groq Parse Error:", error);
    throw error;
  }
};
