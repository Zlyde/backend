/**
 * src/routes/authRoutes.js
 * Lager: "Routing Layer"
 * 
 * Rutter:  
 * - GET /: Välkomstmeddelande
 * - POST /register: Registrera en användare
 * - POST /login: Logga in en användare
 * - GET /github: Logga in med GitHub
 * - GET /github/callback: Callback för GitHub-inloggning
 */

const router = require("express").Router();
const auth = require("../services/authService");
const passport = require("passport");

router.get("/", (req, res) => {
  res.json({ message: "POST /register or /login " });
});

router.post("/register", (req, res) => {
  auth.register(req, res);
});

router.post("/login", (req, res) => {
  auth.login(req, res);
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    const { user, token } = req.user;
    res.redirect(
      `http://localhost:5173/oauth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`,
    );
  },
);

router.get(
  "/githubb",
  passport.authenticate("githubb", { scope: ["user:email"] }),
);
router.get(
  "/githubb/callbackk",
  passport.authenticate("githubb", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    const { user, token } = req.user;
    res.redirect(
      `http://localhost:3000/oauth/callbackk?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`,
    );
  },
);

module.exports = router;
