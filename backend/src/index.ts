import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db";
import { favoritesTable } from "./db/schema";
import { and, eq } from "drizzle-orm";

const app = express();
const PORT = ENV.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// for testing only
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

// delete favorite
app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, userId),
          eq(favoritesTable.recipeId, parseInt(recipeId, 10))
        )
      );

    res.status(200).json({
      message: "Favorite deleted successfully",
      success: true,
    });

  } catch (error) {
    console.log("Error deleting favorite: ", error);
    res.status(500).json({
      error: "Failed to delete favorite",
    });
  }
});

// get a user's favorites
app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));

    if (favorites.length === 0) {
      return res.status(200).json({
        message: "No favorites found for this user",
        success: false,
      });
    }

    res.status(200).json({
      favorites,
      success: true,
    });
  } catch (error) {
    console.log("Error fetching favorites: ", error);
    res.status(500).json({
      error: "Failed to fetch favorites",
    });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
