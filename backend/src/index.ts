import express from "express";
import { ENV } from "./config/env.js"; // This will now resolve to env.ts

const app = express();
const PORT = ENV.PORT || 8080;

app.get("/api/checkhealth", (_req, res) => {
  res.status(200).json({
    message: "Server is healthy",
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
