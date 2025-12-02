import dotenv from "dotenv";
dotenv.config();  // MUST BE FIRST

import { app } from "./app.js";
import { connectDB } from "./config/db.js";

console.log("OPENAI KEY LOADED =", process.env.OPENAI_API_KEY);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
