/**
 * src/routes/userRoutes.js
 * Lager: "Routing Layer"
 * 
 * Rutter:
 * - GET /: Hämta alla användare
 * - GET /:id: Hämta en specifik användare
 * - PUT /:id: Uppdatera en användare
 * - DELETE /:id: Ta bort en användare
 */

const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

// GET: Hämta alla användare
router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Hämta en specifik användare
router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// PUT: Uppdatera en användare
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Ta bort en användare
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
