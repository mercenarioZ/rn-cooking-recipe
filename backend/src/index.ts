import express from "express";
import { ENV } from "./config/env";
import { db } from "./config/db";
import { favoritesTable } from "./db/schema";

const app = express();
const PORT = ENV.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/api/checkhealth", (_req, res) => {
  res.status(200).json({
    message: "Server is healthy",
    success: true,
  });
});

// favorites endpoint
app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    // Validate input
    if (!userId || !recipeId || !title) {
      return res.status(400).json({
        error: "Missing required fields!",
      });
    }

    const newFavorite = await db
      .insert(favoritesTable)
      .values({
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
      })
      .returning();

    res.status(201).json({
      message: "Favorite added successfully",
      favorite: newFavorite[0],
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add favorite",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
